import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from '../pages/Login/Login';
import { Home } from "../pages/Home/Home";
import { Search } from "../pages/Search/Search";
import { ProductsProvider } from "../context/ApiContext";
import { AllProducts } from "../pages/AllProducts/AllProducts";
import { ProductDetail } from "../pages/ProductDetails/ProductDetail";
import { ShoppingCart } from "../pages/ShoppingCart/ShoppingCart";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { ForgotPassword } from "../pages/ForgotPassword/forgotPassword";

export function AppRoutes() {

    return (
        <ProductsProvider>
        <ShoppingCartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/> 
                    <Route path="/forgotPassword" element={<ForgotPassword/>}/> 
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/allproducts" element={<AllProducts/>}/>
                    <Route path="/productDetail/:id" element={<ProductDetail/>}/>
                    <Route path="/shoppingCart" element={<ShoppingCart/>}/>                    
                </Routes>
            </BrowserRouter>
        </ShoppingCartProvider>
        </ProductsProvider>
    )
}