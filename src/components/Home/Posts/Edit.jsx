import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";
import styles from "./Edit.module.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import ReactQuill from "react-quill";
import { Blog } from "../../../contexts/context";
const Edit = () => {
    const { editData } = Blog();
    const [load, setLoad] = useState(false);
    const postId = useParams();
console.log(postId.postId);
    const navigate = useNavigate(null);

    useEffect(() => {
        if (editData) {
            setTitle(editData.title);
            setText(editData.text);
        }
    }, [editData]);

    const handleEdit = async () => {
        try {
            setLoad(true);
            const ref = doc(db, "posts", postId.postId);
            await updateDoc(ref, {
                title,
                text,
            });
            console.log(title,text);
            navigate(`/post/${postId.postId}`);
            toast.success("Update successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoad(false);
        }
    };
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    return (
        <main className={styles.container}>
            <Header />
            <section className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.box}>
                        <div className={styles["articles-header"]}></div>
                        <div className={styles["article-wrapper"]}>
                            <div className={styles["article-box"]}>
                                <section className="write w-[90%] md:w-[80%] lg:w-[60%] mx-auto py-[3rem]">
                                    <h2 className="text-4xl py-4">Title</h2>
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Title"
                                        className="text-4xl outline-none w-full border border-gray-600 p-2"
                                    />
                                    <h2 className="text-4xl pt-4">Text</h2>

                                    <ReactQuill
                                        value={text}
                                        onChange={setText}
                                        placeholder="Text"
                                        className="!text-[5rem] h-[16rem] my-3 border border-gray-600 p-2"
                                        theme="bubble"
                                    />
                                    <button
                                        onClick={handleEdit}
                                        className="border border-teal-600 bg-teal-200 py-2 mt-4 px-5 rounded-lg text-teal-700"
                                    >
                                        {load ? "Edits.." : "Edit"}
                                    </button>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Edit;
