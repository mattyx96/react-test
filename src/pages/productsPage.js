import {createRef, useEffect, useState} from "react";
import {MdOutlineClose as CloseIcon} from "react-icons/md"

import Header from "../components/Header";
import GridView from "../components/GridView";
import ProductPreview from "../components/ProductPreview";
import Search from "../components/Search";
import FilterButton from "../components/FilterButton";

import {products_data} from "../data/products";
import Product from "../components/Product";
import Modal from "../components/Modal";
import useAuth from "../hooks/useAuth";
import Login from "../components/Login";
import TagFilters from "../components/TagFilters";
import ProductForm from "../components/ProductForm";

function ProductsPage() {
    const scrollTrigger = 105;
    const mdBreakpoint = 768;
    const searchRef = createRef();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [products, setProducts] = useState(products_data);
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [productModalIsEdit, setProductModalIsEdit] = useState(false);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openFiltersModal, setOpenFiltersModal] = useState(false);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);

    const {auth, saveAuth} = useAuth();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const handleSearchHeaderPressed = () => {
        window.scroll({top: 0, behavior: 'smooth'});
        searchRef.current.focus();
    };

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    // on product click
    function handleProductPreviewOpen(product, index) {
        setSelectedProduct(product);
        setOpenProductModal(true);
        setSelectedProductIndex(index);
    }

    function handleProductPreviewClose() {
        setOpenProductModal(false);
    }

    function handleLoginModalOpen() {
        setOpenLoginModal(true);
    }

    function handleLoginModalClose() {
        setOpenLoginModal(false);
    }

    function handleFiltersModalClose() {
        setOpenFiltersModal(false);
    }

    function handleFiltersModalOpen() {
        setOpenFiltersModal(true);
    }

    function handleProductModalClose() {
        setOpenAddProductModal(false);
    }

    function handleAddProductModalOpen() {
        setSelectedProduct(null);
        setOpenAddProductModal(true);
    }

    function handleEditProductModalOpen() {
        setProductModalIsEdit(true);
        handleProductPreviewClose();
        setOpenAddProductModal(true);
    }

    function handleOnFilter(pFilters) {
        setSelectedFilters(pFilters);
        handleFiltersModalClose();
        filterAndSearch(pFilters);
    }

    function handleRemoveFilters() {
        setSearch("");
        setSelectedFilters([]);
        setFilterApplied(false);
        setFilteredProducts([]);
    }

    function filterAndSearch() {
        let filtered = [];
        let searched = [];

        //no filters check
        if (selectedFilters.length === 0 && search === "") {
            setFilterApplied(false);
            setFilteredProducts([]);
            return;
        }

        //filters
        if (selectedFilters.length > 0) {
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < selectedFilters.length; j++) {
                    if (products[i].tags.includes(selectedFilters[j])) {
                        filtered.push(products[i]);
                    }
                }
            }
        } else {
            filtered = products;
        }

        //search
        if (search !== "") {
            let lowerCaseSearch = search.toLowerCase();
            for (let i = 0; i < products.length; i++) {
                if (products[i].name.toLowerCase().includes(lowerCaseSearch)) {
                    searched.push(products[i]);
                }
            }
        } else {
            searched = products;
        }

        //calculating intersection between 2 arrays
        filtered = products.filter(Set.prototype.has, new Set(filtered));
        searched = products.filter(Set.prototype.has, new Set(searched));

        const intersection = filtered.filter(Set.prototype.has, new Set(searched));

        // applying filters
        setFilteredProducts(intersection);
        setFilterApplied(true);
    }

    function addProduct(product) {
        const _products = products;
        _products.push(product);
        setProducts([..._products]);
        handleProductModalClose();
    }

    function editProduct(product) {
        const _products = products;
        _products[selectedProductIndex] = product;
        setProducts([..._products])
        handleProductModalClose();
    }

    const handleOnLoginSuccess = () => {
        handleLoginModalClose();
        saveAuth({
            isAuth: true, user: {
                name: "Admin",
            }
        })
    }

    const handleOnLogout = () => {
        saveAuth({
            isAuth: false, user: {
                name: "",
            }
        })
    }

    //filter when search or selected filters change
    useEffect(() => {
        filterAndSearch();
    }, [search, selectedFilters])

    //calculate filter options
    useEffect(() => {
        let _filters = [];
        for (let i = 0; i < products.length; i++) {
            _filters = _filters.concat(products[i].tags);
        }
        setFilters([...new Set(_filters)])
    }, [products])

    //add scroll & resize listeners
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);


    return (<div className="container mx-auto pb-20">
        <Header
            searchHook={scrollPosition > scrollTrigger}
            onSearchPressed={handleSearchHeaderPressed}
            rightItems={
                <>
                    {auth.isAuth &&
                        <button onClick={handleAddProductModalOpen} className="whitespace-nowrap">
                            Add product
                        </button>
                    }
                    {auth.isAuth ?
                        <p className="whitespace-nowrap">Hi &nbsp; {auth.user.name}!</p>
                        :
                        <button onClick={handleLoginModalOpen}>Login</button>}
                    {auth.isAuth && <button onClick={handleOnLogout}>Logout</button>}
                </>
            }
        />
        <div className="mt-28 flex justify-center items-center grid grid-cols-1
                d:grid-cols-5 gap-2 md:mx-16 mx-auto">
            <h3 className="font-thin my-4 text-2xl text-center md:text-left">
                Products
            </h3>
            {filterApplied &&
                <button
                    onClick={handleRemoveFilters}
                    className="mx-auto h-10 p-4 bg-gray-300 rounded-full flex justify-between items-center"
                >
                    <CloseIcon/>
                    &nbsp;
                    <span>Filters applied</span>
                </button>}
            <div className="flex justify-center md:gap-2 md:col-start-3 md:col-span-3">
                <Search
                    className="max-w-screen-sm" ref={searchRef}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <FilterButton
                    fabOnly={width < mdBreakpoint}
                    fabMode={(scrollPosition > scrollTrigger) || (width < mdBreakpoint)}
                    onClick={handleFiltersModalOpen}
                />
            </div>
        </div>
        <GridView className="mt-4 md:mt-10">
            {(filterApplied ? filteredProducts : products).map((obj, index) => {
                return (<ProductPreview
                    key={index}
                    onClick={() => handleProductPreviewOpen(obj, index)}
                    product={obj}
                />)
            })}
        </GridView>

        {/*--------------modals---------------*/}

        <Modal open={openProductModal} onClose={handleProductPreviewClose}>
            <Product
                isAuth={auth.isAuth}
                onEdit={handleEditProductModalOpen}
                onClose={handleProductPreviewClose}
                product={selectedProduct}
            />
        </Modal>
        <Modal open={openLoginModal} onClose={handleLoginModalClose}>
            <Login
                onLogin={handleOnLoginSuccess}
            />
        </Modal>
        <Modal open={openFiltersModal} onClose={handleFiltersModalClose}>
            <TagFilters
                options={filters}
                selectedOptions={selectedFilters}
                onFilter={(filters) => handleOnFilter(filters)}
            />
        </Modal>
        <Modal open={openAddProductModal} onClose={handleProductModalClose}>
            <ProductForm
                onClose={handleProductModalClose}
                isEdit={productModalIsEdit}
                product={selectedProduct}
                onAdd={addProduct}
                onEdit={editProduct}
            />
        </Modal>
    </div>);
}

export default ProductsPage;
