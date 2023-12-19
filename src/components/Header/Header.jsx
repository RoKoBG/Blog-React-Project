import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Auth from "./Auth/Auth";
import { Blog } from "../../contexts/context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/fb";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const DemoHeader = () => {
    const navigate = useNavigate()
    const logOut =async ()=>{
        try {
            await signOut(auth);
            navigate("/")
            toast.success('You have been logged out')
        } catch (err) {
            toast.error(err.message)
        }
    }
    const currUser = Blog();
    const [modal, setModal] = useState(false);
    return (
        <section className={styles.header}>
            <nav>
                <Link className={styles.logo} to="/">
                    Simple Blog
                </Link>

                <input type="checkbox" id="hamburger" />
                <label htmlFor="hamburger">
                    <i
                        className="fa-solid fa-square-caret-down fa-2xl"
                        style={{ color: "fff" }}
                    ></i>
                </label>
                <ul>
                    <li>
                        <Link to="/" className={styles.active}>
                            Home
                        </Link>
                    </li>
                    {!currUser.currUser ? (
                        <>
                            {" "}
                            <li onClick={() => setModal(true)}>
                                <Link>Sign In</Link>
                            </li>
                        </>
                    ) : (
                        ""
                    )}
                    {currUser.currUser ? (
                        <>
                            <li>
                                <Link to="/create">Create Article</Link>
                            </li>

                            <li>
                                <Link
                                    key={currUser.currUser?.uid}
                                    to={`/profile/${currUser.currUser?.uid}`}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="font-red-300">
                                <Link onClick={logOut} to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        ""
                    )}

                    <Auth modal={modal} setModal={setModal} />
                </ul>
            </nav>
            <div className={styles.pic}></div>
        </section>
    );
};
export default DemoHeader;
