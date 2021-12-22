import React from 'react';
import {MdFilterList as FilterIcon} from "react-icons/md";
import PropTypes from "prop-types";
import Header from "./Header";

const FilterButton = (props) => {
    return (
        <div className={props.className}>
            {!props.fabOnly &&
                <button
                    onClick={props.onClick}
                    className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 text-gray-800
                        hover:text-white hover:bg-pink-500 shadow-md"
                >
                    <FilterIcon className="text-xl"/>
                </button>
            }
            {props.fabMode &&
                <button
                    onClick={props.onClick}
                    className="fixed bottom-10 right-10
                        h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 text-white bg-pink-500
                        hover:text-white hover:bg-pink-500 shadow-md"
                >
                    <FilterIcon className="text-3xl"/>
                </button>
            }
        </div>
    );
};

Header.propTypes = {
    fabMode: PropTypes.bool,
    onFilter: PropTypes.func,
    onClick: PropTypes.func,
    fabOnly: PropTypes.bool,
};

Header.defaultProps = {
    fabMode: false,
    fabOnly: false,
    onFilter: () => {
    },
    onClick: () => {
    }
};

export default FilterButton;
