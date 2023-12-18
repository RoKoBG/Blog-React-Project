import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../utils/Input";

import { toast } from "react-toastify";
import styles from "../Auth/SignIn.module.css";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { auth } from "../../../firebase/fb";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ setSignUpReq, setModal }) => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const formSubmit = async (e) => {
        console.log(form)
        e.preventDefault();
        try {
            if (form[("username", "email", "password", "rePassword")] === "") {
                toast.error("All fields are required!");
            } else if (form["password"] !== form["rePassword"]) {
                toast.error("Passwords must be the same!");
                return;
            } else {
                setLoad(true);
                const { user } = await createUserWithEmailAndPassword(
                    auth,
                    form.email,
                    form.password
                );
                const ref = doc(db, "users", user.uid);
    
                const userDoc = await getDoc(ref);
                if (!userDoc.exists()) {
                    await setDoc(ref, {
                        userId: user.uid,
                        username: form.username,
                        email: form.email,
                        userImg: "",
                        bio: "",
                        createdAt: Date.now(),
                    });
                    navigate("/");
                    toast.success("User has been registered!");
                    setModal(false);
                }
                setLoad(false);
            }
        } catch (error) {
            toast.error(error.message)
        }
       
    };

    return (
        <div className={styles["modal-dialog"]}>
            <div className={styles["loginmodal-container"]}>
                <h1>Sign Up with your Email</h1>
                <form onSubmit={formSubmit}>
                    <span>Username</span>
                    <Input
                        form={form}
                        setForm={setForm}
                        type="text"
                        title="username"
                    />
                    <span>Email</span>

                    <Input
                        form={form}
                        setForm={setForm}
                        type="email"
                        title="email"
                    />
                    <span>Password</span>

                    <Input
                        form={form}
                        setForm={setForm}
                        type="password"
                        title="password"
                    />
                    <span>Password repeat</span>

                    <Input
                        form={form}
                        setForm={setForm}
                        type="password"
                        title="rePassword"
                    />

                    <button
                        className={`px-4 py-1 text-sm rounded-full bg-blue-700
                        hover:bg-blue-900 text-white w-fit mx-auto ${
                            load ? "opacity-50 pointer-events-none" : ""
                        }`}
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
                
            </div>
        </div>
    );
};

export default SignUp;
