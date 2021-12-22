import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import "./remove-scrollbar.css"

function Index(props) {
    const {open, children, onClose} = props;

    let ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClose && onClose();
        }
    };

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = open ? 'hidden' : 'auto';
    }, [open])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        <>{
            open &&
            <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 text-white flex flex-col items-center
				justify-center">
                <div ref={ref} className="w-full md:w-7/12 mx-auto overflow-scroll">
                    {children}
                </div>
            </div>
        }
        </>
    );
}

Index.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.element,
    footer: PropTypes.element,
    children: PropTypes.element.isRequired,
};

Index.defaultProps = {
    header: <></>,
    footer: <></>,
};

export default Index;
