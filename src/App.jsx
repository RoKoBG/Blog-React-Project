import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Main from "./components/Main/Main";
import NotFound from "./components/404/NotFound";
import Create from "./components/Home/create/Create";
import Profile from "./components/user/profile/Profile";
import Post from "./components/Home/Posts/Post";
import Edit from "./components/Home/Posts/Edit";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Blog } from "./contexts/context";

function App() {
    const { currUser } = Blog();

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Main />} />

                {!currUser ? (
                    <Route path="/create" element={<Navigate to="/" />} />
                ) : (
                    <Route path="/create" element={<Create />} />
                )}
                {!currUser ? (
                    <Route
                        path={"/profile/:userId"}
                        element={<Navigate to="/" />}
                    />
                ) : (
                    <Route path={"/profile/:userId"} element={<Profile />} />
                )}
                {!currUser ? (
                    <Route
                        path={"/post/:postId/edit"}
                        element={<Navigate to="/" />}
                    />
                ) : (
                    <Route path={"/post/:postId/edit"} element={<Edit />} />
                )}
                <Route path={"/post/:postId/edit"} element={<Edit />} />
                <Route path={"/post/:postId"} element={<Post />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </>
    );
}

export default App;
