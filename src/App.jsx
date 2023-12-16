import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.css";

import Main from "./components/Main/Main";
import Create from "./components/Home/articles/create/Create"
import NotFound from "./components/404/NotFound";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Blog } from "./contexts/context";
import Profile from "./components/user/profile/Profile";

function App() {
const {currUser} = Blog();

    return (
        
        <>
            
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/create" element={<Create/>}/>
                <Route path={"/profile/:userId"} element={<Profile/>}/>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
}

export default App;
