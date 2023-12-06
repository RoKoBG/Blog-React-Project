import React from "react";
import "./App.css";

import Home from "./components/Home/Home";
import Demo from "./components/Demo/Demo";
import HomeHeader from "./components/Home/HomeHeader";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main/Main";

function App() {
    return (
        <>
           <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/demo' element={<Demo />}/>
           </Routes>
        </>
    );
}

export default App;
