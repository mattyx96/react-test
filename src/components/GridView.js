import React from 'react';

function Product(props) {
    return (
        <div className={"px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 " + props.className}>
            {props.children}
        </div>
    );
}

export default Product;
