import React from "react";
import { useState, useRef, useEffect } from "react";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import DemoPost from "./DemoPost";
import { Blog } from "../../../contexts/context";
import styles from "./Create.module.css";
import ReactQuill from "react-quill";

const Create = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const { post, setPost } = Blog();
    return (
        <>
            <main className={styles.container}>
                <Header />
                <section className={styles.main}>
                    <div className={styles.left}>
                        <div className={styles.box}>
                            <div className={styles["articles-header"]}>
                                CREATE ARTICLE
                            </div>
                            <div className={styles["article-wrapper"]}>
                                <div className={styles["article-box"]}>
                                    <section className="w-[80%] md:w-[80%] lg:w[60%] mx-auto py-[3rem]">
                                        <input
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                            type="text"
                                            placeholder="Title of the POST"
                                            className="text-2xl outline-none w-full p-[0.2rem] mb-4 shadow-xl border"
                                        />
                                        <input type="file" hidden />
                                        <ReactQuill
                                            theme="bubble"
                                            value={text}
                                            onChange={setText}
                                            placeholder="Write your post..."
                                            className="text-3xl outline-none  w-full p-[1rem] shadow-xl border"
                                        />
                                        <button
                                            onClick={() => setPost(true)}
                                            className="border border-teal-600 bg-teal-200 py-2 mt-4 px-5 rounded-lg text-teal-700"
                                        >
                                            Create
                                        </button>
                                    </section>
                                    <div
                                        className={`${
                                            post
                                                ? "visible opacity-100"
                                                : "invisible opacity-0"
                                        }`}
                                    >
                                        <DemoPost
                                            setPost={setPost}
                                            title={title}
                                            text={text}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default Create;
