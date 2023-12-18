import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Main from "./components/Main/Main";
import NotFound from "./components/404/NotFound";
import Create from "./components/Home/create/Create";
import Profile from "./components/user/profile/Profile";
import Post from "./components/Home/Posts/Post";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Blog } from "./contexts/context";

function App() {
const {currUser} = Blog();

    return (
        
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/create" element={<Create/>}/>
                <Route path={"/profile/:userId"} element={<Profile/>}/>
                <Route path={"/post/:postId"} element={<Post/>}/>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
}

export default App;
