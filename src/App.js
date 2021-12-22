import './App.css';
import {Route, Routes} from "react-router-dom";
import ProductsPage from "./pages/productsPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                {/*<Route path="login" element={<Login />} />*/}
            </Routes>
        </>
    );
}

export default App;
