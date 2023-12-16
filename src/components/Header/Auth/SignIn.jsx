import React, { useState } from "react";
import styles from "../Auth/SignIn.module.css";

import Input from "../../../utils/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/fb";

const SignIn = ({ setSignUpReq }) => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const formSubmit = async (e) => {
        e.preventDefault();
        if (form[("email", "password")] === "") {
            toast.error("All fields are required!");
        }
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
        } catch (err) {}
    };
    return (
        <div className={styles["modal-dialog"]}>
            <div className={styles["loginmodal-container"]}>
                <h1>Login to Your Account</h1>
                <form onSubmit={formSubmit}>
                    <Input
                        form={form}
                        setForm={setForm}
                        type="text"
                        title="email"
                        value="Email"
                    />
                    <Input
                        form={form}
                        setForm={setForm}
                        type="password"
                        title="password"
                        value="Password"
                    />
                    <button
                        className="px-4 py-1 text-sm rounded-full bg-blue-700
                        hover:bg-blue-900 text-white w-fit mx-auto"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    onClick={() => setSignUpReq("")}
                    className="mt-5 text-sm text-green-600 hover:text-green-700 flex items-center mx-auto"
                >
                    Go back
                </button>
                <div className={styles["login-help"]}>
                    <a href="#">Register</a>
                    <a href="#">Forgot Password</a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
