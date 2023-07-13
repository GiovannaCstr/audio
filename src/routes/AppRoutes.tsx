import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from '../pages/Login/SignIn';
import { SignUp } from '../pages/Login/SignUp';
import { Home } from "../pages/Home/Home";
import { Search } from "../pages/Search/Search";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/search" element={<Search />}/>
            </Routes>
        </BrowserRouter>
    )
}