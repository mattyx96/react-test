import React from 'react';
import {MdEdit as EditIcon, MdOutlineClose as CloseIcon} from "react-icons/md"
import Header from "./Header";
import PropTypes from "prop-types";

function Product(props) {
    const {product, isAuth, onClose, onEdit} = props;
    const {name, description, price, url_img, tags,} = product;

    return (
        <div className="flex justify-center items-center my-2">
            <div className="w-full p-4">
                <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                    <div className="text-black flex justify-end gap-4 text-2xl">
                        {isAuth && <button onClick={onEdit}><EditIcon/></button>}
                        <button onClick={onClose}><CloseIcon/></button>
                    </div>
                    <div className="prod-title">
                        <p className="text-2xl my-2 uppercase text-gray-900 font-bold">
                            {name}
                        </p>
                        <p className="text-gray-900">{tags.map((obj, i) => (i + 1) === tags.length ? obj : `${obj}, `)}</p>
                    </div>
                    <div className="my-4">
                        <img src={url_img} className="w-full object-cover object-center rounded-xl"/>
                    </div>
                    <p className="text-sm my-4 text-gray-400">
                        {description}
                    </p>
                    <div className="prod-info grid gap-10 mt-4">
                        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                            <p className="font-bold text-xl">
                                ${price}
                            </p>
                            <button
                                className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    onEdit: PropTypes.func,
    onClose: PropTypes.func,
    isAuth: PropTypes.bool,
    product: PropTypes.object,
};

Header.defaultProps = {
    onEdit: () => {
    },
    onClose: () => {
    },
    isAuth: false,
    product: {
        name: "",
        description: "",
        price: 50,
        url_img: "",
        tags: [""],
    },
};

export default Product;
