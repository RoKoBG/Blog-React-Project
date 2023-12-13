import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Context from "./contexts/context.jsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    
        <BrowserRouter>
            <Context>
                <App />
            </Context>
        </BrowserRouter>
    
);
