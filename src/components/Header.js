import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import PropTypes from "prop-types";
import {MdSearch as SearchIcon} from "react-icons/md";

// import {MdShoppingCart as ShoppingCartIcon} from "react-icons/md";

function Header(props) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className={"fixed top-0 left-0 right-0 w-screen " + props.className}>
            <nav className="bg-white dark:bg-gray-800  shadow">
                <div className="max-w-full mx-auto px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="w-full flex items-center">
                            <a className="flex-shrink-0" href="/">
                                <img className="h-8 w-8 bg-black rounded-[4rem]" src={logo} alt="Workflow"/>
                            </a>
                            <span className="ml-2 md:ml-10 w-full flex-start text-left text-2xl text-black font-bold">React test</span>
                            <div className="hidden md:block">
                                <div
                                    className="ml-10 flex items-center space-x-12 text-gray-800 rounded-md text-sm font-medium">
                                    {props.searchHook &&
                                    <button className="text-gray-800 hover:text-black dark:hover:text-white px-3 py-2
                                            rounded-md text-sm font-medium" onClick={props.onSearchPressed}>
                                        <SearchIcon className="text-xl"/>
                                    </button>
                                    }
                                    {props.rightItems}
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="ml-4 flex items-center md:ml-6">
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={toggleOpen}
                                className="text-gray-300 dark:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                <svg width="20" height="20" fill="currentColor" className="h-8 w-8"
                                     viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={open ? "md:hidden" : "hidden"}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <div
                            className="block text-center h-full text-gray-800 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {props.searchHook &&
                                <button className="text-gray-800 hover:text-black dark:hover:text-white px-3 py-2
                                            rounded-md text-sm font-medium" onClick={props.onSearchPressed}>
                                    <SearchIcon className="text-xl"/>
                                </button>
                            }
                            {props.rightItems}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

Header.propTypes = {
    searchHook: PropTypes.bool,
    onSearchPressed: PropTypes.func,
    rightItems: PropTypes.element
};

Header.defaultProps = {
    searchHook: false,
    rightItems: <></>,
    onSearchPressed: () => {
    }
};

export default Header;
