import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {MdOutlineClose as CloseIcon} from "react-icons/md";

// import {MdShoppingCart as ShoppingCartIcon} from "react-icons/md";

function ProductForm(props) {

    const [product, setProduct] = React.useState(props.product);

    useEffect(() => {
        setProduct(props.product);
    }, [props.options])

    return (
        <div className="bg-white w-full rounded-xl p-10">
            <div className="text-black flex justify-end gap-4 text-2xl">
                <button onClick={props.onClose}><CloseIcon/></button>
            </div>
            <h1 className="text-black text-2xl text-center font-bold">{props?.product?.length > 0 ? "Edit" : "New"} product</h1>
            <div className="p-4 bg-gray-100 rounded-lg bg-opacity-5 flex justify-center">
                <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                        <a href="#" className="block relative">
                            {product?.url_img && <img src={product?.url_img}
                                                      className="w-full object-cover object-center rounded-xl"/>}
                        </a>
                    </div>
                </div>
            </div>
            <div className="space-y-6 bg-white">
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Image URL
                    </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <div className=" relative ">
                            <input
                                type="text"
                                onChange={(event => setProduct({...product, ...{url_img: event.target.value}}))}
                                value={product?.url_img}
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                                placeholder="https://...."/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Name
                    </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <div className=" relative ">
                            <input
                                type="text"
                                onChange={(event => setProduct({...product, ...{name: event.target.value}}))}
                                value={product?.name}
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                                placeholder="Name"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Description
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div>
                            <div className=" relative ">
                                <textarea
                                    rows={4}
                                    onChange={(event => setProduct({...product, ...{description: event.target.value}}))}
                                    value={product?.description}
                                    className="border-transparent rounded-xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Price
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div>
                            <div className=" relative ">
                                <div className="flex justify-center items-center">
                                    <span>$&nbsp;</span>
                                    <input
                                        type="number"
                                        onChange={(event => setProduct({...product, ...{price: event.target.value}}))}
                                        value={product?.price}
                                        min={0}
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                                        placeholder="Price"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Tags
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div>
                            <div className=" relative ">
                                <textarea
                                    rows={4}
                                    onChange={(event => setProduct({...product, ...{tags: event.target.value?.split(",")}}))}
                                    value={product?.tags?.join()}
                                    className="border-transparent rounded-xl flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#62DAFB] focus:border-transparent"
                                    placeholder="Write Tags separated by comma: Tag1,Tag2,Tag3,...."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button
                        onClick={() => {
                            if (!Array.isArray(product.tags)) {
                                product.tags = [];
                            }
                            props.isEdit ? props.onEdit(product) : props.onAdd(product)
                        }}
                        className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-[#62DAFB] focus:ring-offset-[#62DAFB]blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Save
                    </button>
                </div>
            </div>

        </div>

    );
}

ProductForm.propTypes = {
    product: PropTypes.object,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onClose: PropTypes.func,
    isEdit: PropTypes.bool.isRequired,
    editIndex: PropTypes.number,
};

ProductForm.defaultProps = {
    product: {},
    onClose: () => {
    },
};

export default ProductForm;
