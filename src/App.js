import './App.css';
import {Route, Routes} from "react-router-dom";
import Products from "./pages/Products";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Products />} />
                
                {/*<Route path="login" element={<Login />} />*/}
            </Routes>
        </>
    );
}

export default App;
