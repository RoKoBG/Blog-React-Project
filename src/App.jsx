import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.css";

import Main from "./components/Main/Main";
import NotFound from "./components/404/NotFound";
import { Blog } from "./contexts/context";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

function App() {

    const {currUser}  = Blog();

    return (
        <>
            {currUser ? <Main /> : ""}
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
}

export default App;
