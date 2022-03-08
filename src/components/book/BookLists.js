import React, {useEffect} from "react";
import Swal from "sweetalert2";
import apiClient from "../../axios/apiClient";
import {useTable, usePagination} from "react-table";
import {Link} from "react-router-dom";

export default function BookLists() {
    const [books, setBooks] = React.useState([]);
    useEffect(()=>{getBooks()}, []);

    const getBooks = async () => {
        await apiClient.get("/books")
            .then(res => {
                setBooks(res.data["data"]["books"]);
            })
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: err.response.data["message"],
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            });
    };

    const deleteBook = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                apiClient.delete(`/books/${id}`).then(r => {
                    Swal.fire("Deleted!", "Book has been deleted.", "success").then(() => {
                        setBooks(books.filter(book => book.id !== id));
                    });
                }).catch(err => {
                    Swal.fire({
                        title: "Error",
                        text: err.response.data["message"],
                        icon: "error",
                        confirmButtonText: "Ok"
                    });
                });
            }
        });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Author',
                accessor: 'author',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Is Readed?',
                accessor: 'read',
                Cell: ({value}) => (
                    <>
                        {value ? ( <span className="inline-flex items-center px-3 py-1 text-sm font-medium leading-5 rounded-full bg-green-100 text-green-800"> True </span> ) :
                            (<span className="inline-flex items-center px-3 py-1 text-sm font-medium leading-5 rounded-full bg-red-100 text-red-800"> False </span> )}
                    </>
                ),
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({value}) => (
                    <div className=" whitespace-nowrap space-x-3">
                        <Link to={`/books/edit/${value}`}
                              className="py-2 px-4 rounded bg-green-100 text-green-800 transition ease-in-out duration-150"
                        >Edit
                        </Link>
                        <button
                            className="py-2 px-4 items-center rounded bg-red-100 text-red-800 transition ease-in-out duration-150"
                            onClick={() => deleteBook(value)}>
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        [books]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state: { pageIndex, pageSize },
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
    } = useTable({
        columns,
        data:books,
        initialState: {
            pageSize: 10,
            pageIndex: 0,
        },
        autoResetPage: false,
    },usePagination);

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 shadow">
                            <thead className="bg-gray-50">
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {column.render('Header')}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            </thead>
                            <tbody {...getTableBodyProps} className="bg-white divide-y divide-gray-200">
                                {page.map((row,i) =>{
                                   prepareRow(row);
                                   return(
                                       <tr {...row.getRowProps()}>
                                           {
                                               row.cells.map(cell => {
                                                   return(
                                                       <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap">
                                                           {cell.render('Cell')}
                                                       </td>
                                                   )
                                               })
                                           }
                                       </tr>
                                   )
                                })}
                            </tbody>
                        </table>
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:block">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing
                                        <span className="font-medium"> {pageSize * pageIndex +1} </span>
                                        to
                                        <span className="font-medium"> {pageSize * (pageIndex+1)} </span>
                                        of
                                        <span className="font-medium"> { books.length } </span>
                                        results
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end">
                                <button onClick={()=>previousPage()}
                                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled={!canPreviousPage}>
                                    Previous
                                </button>
                                <button onClick={()=>nextPage()}
                                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled={!canNextPage}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}