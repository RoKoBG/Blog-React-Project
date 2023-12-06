import React from "react";
import styles from "../components/Header/Auth/SignIn.module.css";
const Input = ({ type, title, value }) => {
    return (
        <div>
           
            <input type={type} name={title} value={value}/>
        </div>
    );
};

export default Input;
