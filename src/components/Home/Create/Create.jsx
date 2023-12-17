import React from "react";
import { useState, useRef } from "react";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Blog } from "../../../contexts/context";
import styles from "./Create.module.css";
import ReactQuill from "react-quill";

const Create = () => {
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const imgRef = useRef(null);

    const { post } = Blog();

    const handleClick = () => {
        imgRef.current.click();
    };
    const handleSubmit = () => {
        try {
            console.log(text, imgUrl);
        } catch (error) {}
    };
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
                                            onChange={(e) =>
                                                setInput({
                                                    ...input,
                                                    title: e.target.value,
                                                })
                                            }
                                            type="text"
                                            placeholder="Title of the POST"
                                            className="text-2xl outline-none w-full p-[0.2rem] mb-4 shadow-xl border"
                                        />
                                        <div
                                            style={{
                                                backgroundImage: `url(${imgUrl})`,
                                            }}
                                            onClick={handleClick}
                                            className="w-full h-[200px] object-cover bg-gray-100 my-3 cursor-pointer bg-cover bg-no-repeat"
                                        >
                                            {!imgUrl && "Add Image"}
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                setImgUrl(
                                                    URL.createObjectURL(
                                                        e.target.files[0]
                                                    ),
                                                    setInput({
                                                        ...input,
                                                        imgUrl: imgUrl,
                                                    })
                                                );
                                            }}
                                            ref={imgRef}
                                            type="file"
                                            hidden
                                        />
                                        <ReactQuill
                                            theme="bubble"
                                            value={text}
                                            onChange={setText}
                                            placeholder="Write your post..."
                                            className="text-3xl outline-none  w-full p-[1rem] shadow-xl border"
                                        />
                                        <button onClick={handleSubmit} className="border border-teal-600 bg-teal-200 py-2 mt-4 px-5 rounded-lg text-teal-700">
                                            Create
                                        </button>
                                    </section>
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
