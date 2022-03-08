import React from "react";
import {Link} from "react-router-dom";

class BookRow extends React.Component {
    render() {
        const {book} = this.props;
        return (
            <tr>
                <td className="px-6 py-4 whitespace-normal">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-normal">{book.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {book.read ? (
                        <span
                            className="inline-flex items-center px-3 py-1 text-sm font-medium leading-5 rounded-full bg-green-100 text-green-800">
                    True
                </span>
                    ) : (
                        <span
                            className="inline-flex items-center px-3 py-1 text-sm font-medium leading-5 rounded-full bg-red-100 text-red-800">
                    False
                </span>
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                    <Link to={`/books/edit/${book.id}`}
                        className="py-2 px-4 rounded bg-green-100 text-green-800 transition ease-in-out duration-150"
                        >Edit
                    </Link>
                    <button
                        className="py-2 px-4 items-center rounded bg-red-100 text-red-800 transition ease-in-out duration-150"
                        onClick={() => this.props.handleDeleteBook(book.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}
export default BookRow;