import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from '../pages/Login/Login';
import { Home } from "../pages/Home/Home";
import { Search } from "../pages/Search/Search";
import { ProductsProvider } from "../context/ApiContext";
import { AllProducts } from "../pages/AllProducts/AllProducts";
import { ProductDetail } from "../pages/ProductDetails/ProductDetail";


export function AppRoutes() {
    return (
        <ProductsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/> :
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/allproducts" element={<AllProducts/>}/>
                    <Route path="/ProductDetail/:id" element={<ProductDetail/>}/>
                </Routes>
            </BrowserRouter>
        </ProductsProvider>
    )
}