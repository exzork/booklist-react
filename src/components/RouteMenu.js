import {Routes, Route} from "react-router-dom";
import React from "react";
import BookLists from "./book/BookLists";
import BookAdd from "./book/BookAdd";
import BookEdit from "./book/BookEdit";

export default function RouteMenu(props) {
    return (
        <Routes>
            <Route path="/" element={<BookLists/>}/>
            <Route path="/books/add" element={<BookAdd/>}/>
            <Route path="/books/edit/:id" element={<BookEdit/>}/>
        </Routes>
    );
}