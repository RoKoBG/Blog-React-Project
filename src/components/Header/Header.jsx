import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Auth from "./Auth/Auth";
import { Blog } from "../../contexts/context";
const DemoHeader = () => {
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
                    {currUser.currUser ? (
                        <p className={styles.welcome}>
                            Welcome <span className="font-bold">{currUser.currUser?.displayName}</span>
                        </p>
                    ) : (
                        ""
                    )}

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
                    <li>
                        <Link to="/articles">Articles</Link>
                    </li>
                    {currUser.currUser ? (
                        <>
                            <li>
                                <Link to="/create">Create Article</Link>
                            </li>

                            <li>
                                <Link key={currUser.currUser?.uid} to={`/profile/${currUser.currUser?.uid}`}>Profile</Link>
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
