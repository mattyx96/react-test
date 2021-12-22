import React from 'react';
import {MdSearch as SearchIcon} from "react-icons/md";

const Search = React.forwardRef((props, ref) => {
    return (
        <div className={props.className}>
            <div className={"flex justify-center items-center"}>
                <input
                    ref={ref}
                    type="text"
                    value={props.value}
                    onChange={(e)=>props.onChange(e)}
                    className="rounded-lg border-transparent appearance-none border ring-gray-200 ring-2
                        py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none
                        focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                    placeholder="Search..."
                />
                <div>
                    <button
                        className="flex-shrink-0 ml-2 p-4 rounded-full text-white bg-pink-500 hover:bg-pink-700 shadow-md
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    focus:ring-offset-purple-200">
                        <SearchIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Search;
