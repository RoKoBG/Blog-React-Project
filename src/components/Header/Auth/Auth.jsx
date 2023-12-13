import React, { useState } from "react";

import Modal from "../../../utils/Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

import { AiOutlineMail } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { LiaTimesSolid } from "react-icons/lia";

import styles from "../Auth/Auth.module.css";

import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../../firebase/fb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = ({ modal, setModal }) => {
    const Button = ({ icon, text, click }) => {
        return (
            <button
                onClick={click}
                className="flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full"
            >
                {icon} {text}
            </button>
        );
    };

    const [createUser, setCreateUser] = useState(false);
    const [signUpReq, setSignUpReq] = useState("");
    const navigate = useNavigate();
    const googleAuth = async () => {
        try {
            const createUser = await signInWithPopup(auth, provider);
            const newUser = createUser.user;
            const ref = doc(db, "users", newUser.uid);
            const userDoc = await getDoc(ref);
            if (!userDoc.exists()) {
                await setDoc(ref, {
                    userId: newUser.uid,
                    username: newUser.displayName,
                    email: newUser.email,
                    userImg: newUser.photoURL,
                    bio: "",
                });
                navigate("/");
                toast.success("User have been registered!");
                setModal(false);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };
    return (
        <Modal modal={modal} setModal={setModal}>
            <section
                className={`z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white ${
                    modal ? "visible opacity-100" : "invisible opacity-0"
                } transition-all duration-500`}
            >
                <button
                    onClick={() => setModal(false)}
                    className="absolute top-8 right-8 text-2x1 hover:opacity-50"
                >
                    <LiaTimesSolid />
                </button>
                <div className="flex flex-col justify-center items-center gap-[3rem]">
                    {signUpReq === "" ? (
                        <>
                            <h3 className={styles.msg}>
                                {createUser ? "Join us" : "Welcome back"}
                            </h3>
                            <div className="flex flex-col gap-2 w-fit mx-auto">
                                <Button
                                click={googleAuth}
                                    icon={<FcGoogle className="text-x1" />}
                                    text={`${
                                        createUser ? "Sign up" : "Sign In"
                                    } with Google!`}
                                />
                                <Button
                                    click={() => {
                                        setSignUpReq(
                                            createUser ? "sign-up" : "sign-in"
                                        );
                                    }}
                                    icon={<AiOutlineMail className="text-x1" />}
                                    text={`${
                                        createUser ? "Sign up" : "Sign in"
                                    } with Email`}
                                />
                            </div>
                            <p>
                                {createUser
                                    ? "Already have an account?"
                                    : "You don't have account?"}
                                <button
                                    onClick={() => {
                                        setCreateUser(!createUser);
                                    }}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    {createUser ? "Sign in" : " Create one"}
                                </button>
                            </p>
                        </>
                    ) : signUpReq === "sign-in" ? (
                        <SignIn
                            setModal={setModal}
                            setSignUpReq={setSignUpReq}
                        />
                    ) : signUpReq === "sign-up" ? (
                        <SignUp
                            setModal={setModal}
                            setSignUpReq={setSignUpReq}
                        />
                    ) : null}
                </div>
            </section>
        </Modal>
    );
};

export default Auth;
