import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Context from "./contexts/context.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.bubble.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    
        <BrowserRouter>
            <Context>
                <App />
            </Context>
        </BrowserRouter>
    
);
