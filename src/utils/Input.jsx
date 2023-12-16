import React from "react";
import styles from "../components/Header/Auth/SignIn.module.css";
const Input = ({ type, title, form, setForm }) => {
    // Change form event handler
    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value });
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm capitalize">{title}</label>
            <input
                className="text-left border-b border-black outline-none"
                type={type}
                name={title}
                onChange={changeHandler}
            />
        </div>
    );
};

export default Input;
