import React from "react";
import {Component} from "react";
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerTitle: "Book",
        }
    }

    handleHeaderTitleChange = (headerTitle) => {
        this.setState({
            headerTitle: headerTitle
        })
    }


    render() {
        return (
            <BrowserRouter>
                <Navbar handleHeaderTitleChange={this.handleHeaderTitleChange}/>
                <Header name={this.state.headerTitle}/>
                <Main/>
            </BrowserRouter>
        )
    }
}

export default App;
