import React from "react";
import styles from "../components/Header/Auth/SignIn.module.css";
const Input = ({ type, title, value, form, setForm }) => {
    // Change form event handler
    const changeHandler = () => {
        setForm({ ...form, [e.target.name]: [e.target.value] });
    };

    return (
        <div>
            <input
                type={type}
                name={title}
                value={value}
                onChange={changeHandler}
            />
        </div>
    );
};

export default Input;
