import React, {useEffect} from "react";
import {useState} from "react";
import Swal from "sweetalert2";
import apiClient from "../../axios/apiClient";

export default function BookEdit() {

    const bookId = window.location.pathname.split("/")[3];

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [read, setRead] = useState(false);

    useEffect(()=>{getBook()},[])

    const getBook = async () => {
        await apiClient.get(`/books/${bookId}`).then(res => {
            setTitle(res.data["data"]["book"]["title"]);
            setAuthor(res.data["data"]["book"]["author"]);
            setDescription(res.data["data"]["book"]["description"]);
            setRead(res.data["data"]["book"]["read"]);
        }).catch(err => {
            Swal.fire({
                title: "Error",
                text: err.response.data["message"],
                icon: "error",
                confirmButtonText: "Ok"
            });
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await apiClient.put(`/books/${bookId}`, {title, author, description, read}).then(response => {
            Swal.fire({
                title: 'Book updated!',
                text: 'The book has been updated successfully!',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: error.response.data['message'],
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Please fill book details</p>
                    </div>

                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="title"
                                   className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input type="text" aria-label="Title" name="title" id="title"
                                       className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                       value={title} onChange={(event) => setTitle(event.target.value)}/>
                            </div>
                        </div>
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="author"
                                   className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                                Author
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input type="text" aria-label="Author" name="author" id="author"
                                       className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                       value={author} onChange={(event) => setAuthor(event.target.value)}/>

                            </div>
                        </div>
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description"
                                   className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                                Description
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <textarea aria-label="Description" name="description" id="description" rows="5"
                                              className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                              value={description}
                                              onChange={(event) => setDescription(event.target.value)}/>
                            </div>
                        </div>
                        <div
                            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="read"
                                   className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                                Is Readed?
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input checked={read} type="checkbox" aria-label="Is Readed?" name="read" id="read"
                                       className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                       onChange={(event) => setRead(event.target.checked)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5">
                <button type="submit"
                        className="block w-full justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Save
                </button>
            </div>
        </form>
    )
}