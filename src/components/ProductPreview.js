import React from 'react';
import PropTypes from "prop-types";
import Header from "./Header";

const truncateString = (string = '', maxLength = 50) =>
    string.length > maxLength
        ? `${string.substring(0, maxLength)}…`
        : string

function ProductPreview(props) {
    const {product, onClick} = props;
    return (
        <button onClick={onClick} className="shadow-lg rounded-2xl bg-white w-64 m-auto p-2">
            <img src={product.url_img} className="w-auto p-4 h-auto max-h-44 max-w-full m-auto rounded-[2rem]"/>
            <div className="bg-black m-4 p-4 rounded-2xl">
                <p className="text-white text-xl font-bold ">
                    {product.name}
                </p>
                <p className="text-gray-50 text-xs mt-2">
                    {truncateString(product.description, 50)}
                </p>
                {/*<div className="flex items-center justify-between mt-4">*/}
                <p className="text-white text-xl m-4 font-bold">
                    ${product.price}
                </p>
                {false &&
                <button type="button"
                        className="w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="white"
                         viewBox="0 0 1792 1792">
                        <path
                            d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                        </path>
                    </svg>
                </button>
                }
                {/*</div>*/}
            </div>
        </button>
    );
}

Header.propTypes = {
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    product: PropTypes.object,
};

Header.defaultProps = {
    onOpen: () => {},
    onClose: () => {},
    product: {
        name: "",
        description: "",
        price: 50,
        url_img: "",
        tags: [""],
    },
};

export default ProductPreview;
