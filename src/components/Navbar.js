import React from "react";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";

class Navbar extends React.Component{
    toggleMobileMenu = () => {
        const menuShow = document.querySelector(".menu-show");
        const menuHide = document.querySelector(".menu-hide");
        const mobileMenu = document.querySelector("#mobile-menu");

        if (menuShow.classList.contains("block")){
            menuShow.classList.remove("block");
            menuShow.classList.add("hidden");
            menuHide.classList.add("block");
            menuHide.classList.remove("hidden");

            mobileMenu.classList.add("block");
            mobileMenu.classList.remove("hidden");
        } else {
            menuShow.classList.add("block");
            menuShow.classList.remove("hidden");
            menuHide.classList.remove("block");
            menuHide.classList.add("hidden");

            mobileMenu.classList.remove("block");
            mobileMenu.classList.add("hidden");
        }
    }
    constructor(props){
        super(props);
        const {handleHeaderTitleChange} = this.props;
        this.handleHeaderTitleChange = handleHeaderTitleChange;

        const pathname = window.location.pathname;
        if (pathname==="/") handleHeaderTitleChange("Books")
        else if(pathname==="/books/add") handleHeaderTitleChange("Add Book")
        else if(pathname.indexOf("/books/edit/")>-1) handleHeaderTitleChange("Edit Book")
    }
    render() {
        return(
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button onClick={this.toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out">
                                <svg className="menu-show block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                                <svg className="menu-hide hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center text-white text-lg">
                                Book List
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <MenuDesktop handleHeaderTitleChange={this.handleHeaderTitleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="hidden sm:hidden" id="mobile-menu">
                    <div className="px-2 pt2 pb-3 space-y-1">
                        <MenuMobile handleHeaderTitleChange={this.handleHeaderTitleChange}/>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Navbar;