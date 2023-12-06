import React from "react";
import "./App.css";

import Home from "./components/Home/Home";
import NotFound from "./components/404/NotFound";
import HomeHeader from "./components/Home/HomeHeader";
import { Blog } from "./contexts/context";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main/Main";
import { Navigate } from "react-router-dom";
function App() {
    const { currUser } = Blog();
    return (
        <>
            {currUser ? <Main /> : ""}
            <Routes>
                <Route path="/" element={<Main />} />

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
}

export default App;
