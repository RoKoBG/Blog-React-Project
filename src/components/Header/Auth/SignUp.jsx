import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../utils/Input";

import { toast } from "react-toastify";
import styles from "../Auth/SignIn.module.css";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/fb";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ setSignUpReq, setModal }) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const formSubmit = async (e) => {
        const navigate = useNavigate();
        e.preventDefault();
        if (form[("username", "email", "password", "rePassword")] === "") {
            toast.error("All fields are required!");
        } else if (form["password"] !== form("rePassword")) {
            toast.error("Password and Re-Password doesn't match!");
            return;
        } else {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            const ref = doc(db, "users", user.id);
            const userDoc = await getDoc(ref);

            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: user.uid,
                    username: form.displayName,
                    email: form.email,
                    userImg: "",
                    bio: "",
                });
                navigate("/");
                toast.success("Registration complete, auto Logging In.");
                setModal(false);
            }
        }
    };

    return (
        <div className={styles["modal-dialog"]}>
            <div className={styles["loginmodal-container"]}>
                <h1>Sign Up with your Email</h1>
                <form onSubmit={formSubmit}>
                    <Input
                        form={form}
                        setForm={setForm}
                        type="text"
                        title="username"
                    
                    />
                    <Input
                        form={form}
                        setForm={setForm}
                        type="text"
                        title="email"
                    
                    />
                    <Input
                        form={form}
                        setForm={setForm}
                        type="password"
                        title="password"
                        
                    />
                    <Input
                        form={form}
                        setForm={setForm}
                        type="password"
                        title="rePassword"
                    
                    />

                    <button
                        className="px-4 py-1 text-sm rounded-full bg-blue-700
                        hover:bg-blue-900 text-white w-fit mx-auto"
                    >
                        Sign Up
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

export default SignUp;
