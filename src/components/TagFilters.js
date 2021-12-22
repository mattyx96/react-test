import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import GridView from "./GridView";

// import {MdShoppingCart as ShoppingCartIcon} from "react-icons/md";

function TagFilters(props) {

    const [options, setOptions] = React.useState(props.options);
    const [selectedOptions, setSelectedOptions] = React.useState([]);

    function handleCheckboxChange(e, obj) {
        let _selOpt = selectedOptions;
        if (e.target.checked) {
            _selOpt.push(obj);
        } else {
            _selOpt.splice(_selOpt.indexOf(obj), 1);
        }
        console.log(_selOpt);
        setSelectedOptions([..._selOpt]);
    }

    useEffect(() => {
        setOptions(props.options);
        setSelectedOptions(props.selectedOptions);
    }, [props.options, props.selectedOptions])

    return (
        <div className="bg-white w-full rounded-xl p-10">
            <GridView>
                {
                    options.map((obj, index) => {
                        return (
                            <div key={index}>
                                <label className="flex items-center space-x-3 mb-3">
                                    <input type="checkbox" name="checked-demo"
                                           checked={selectedOptions.includes(obj)}
                                           onChange={(e) => handleCheckboxChange(e, obj)}
                                           className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"/>
                                    <span className="text-gray-700 dark:text-white font-normal">
                                    {obj}
                                </span>
                                </label>
                            </div>
                        );
                    })
                }
            </GridView>
            <button
                onClick={() => props.onFilter(selectedOptions)}
                className="h-12 w-full mt-4 rounded-xl flex items-center justify-center flex-shrink-0 text-gray-800
                        hover:text-white hover:bg-pink-500 shadow-md"
            >
                Apply
            </button>
        </div>

    );
}

TagFilters.propTypes = {
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    onFilter: PropTypes.func.isRequired,
};

TagFilters.defaultProps = {};

export default TagFilters;
