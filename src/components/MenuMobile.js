import React from "react";
import {Link, useLocation} from "react-router-dom";

export default function MenuMobile(props) {
    const location = useLocation();
    const {handleHeaderTitleChange} = props;
    return (
        <>
            {location.pathname === "/" ?
                (
                    <Link to="/"
                          className="menu-item block bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Book</Link>
                ) :
                (
                    <Link to="/" onClick={() => handleHeaderTitleChange("Book")} className="menu-item text-gray-300 block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Book</Link>
                )
            }
            {location.pathname==="/books/add" ?
                (
                    <Link to="/books/add"
                          className="menu-item block bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Add Book</Link>
                ) :
                (
                    <Link to="/books/add" onClick={() => handleHeaderTitleChange("Add Book")} className="menu-item text-gray-300 block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Book</Link>
                )
            }
        </>
    )
}
