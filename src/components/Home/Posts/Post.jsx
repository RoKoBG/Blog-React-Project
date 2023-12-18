import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Post.module.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";
import Load from "../../Load/Load";
import moment from "moment";
import Actions from "./Actions";
import Like from "./Like";
import Comment from "./Comment";
const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setLoad(true);
            try {
                const postRef = doc(db, "posts", postId);
                const getPost = await getDoc(postRef);

                if (getPost.exists()) {
                    const postData = getPost.data();
                    if (postData?.userId) {
                        const userRef = doc(db, "users", postData?.userId);
                        const getUser = await getDoc(userRef);

                        if (getUser.exists()) {
                            const userData = getUser.data();
                            setPost({ ...postData, ...userData, id: postId });
                        }
                    }
                }
                setLoad(false);
            } catch (error) {
                toast.error(error.message);
            }
        };
        console.log(post);
        fetchPost();
    }, [postId, post?.userId]);

    const { title, text, img, username, createdAt, userImg, userId } = post;
    const navigate = useNavigate();
    return (
        <>
            {load ? (
                <Load />
            ) : (
                <main className={styles.container}>
                    <Header />
                    <section className={styles.main}>
                        <div className={styles.left}>
                            <div className={styles.box}>
                                <div
                                    className={styles["articles-header"]}
                                ></div>
                                <div className={styles["article-wrapper"]}>
                                    <div className={styles["article-box"]}>
                                        <section className="w-[100%] lg:w-[60%] mx-auto py-[3rem]">
                                            <h2 className="text-4xl font-bold capitalize">
                                                {title}
                                            </h2>
                                            <div className="flex items-center gap-2 py-[2rem]">
                                                <img
                                                    onClick={() =>
                                                        navigate(
                                                            `/profile/${userId}`
                                                        )
                                                    }
                                                    src={userImg}
                                                    alt={username}
                                                    className=" cursor-pointer w-[3rem] h-[3rem] object-cover rounded-full"
                                                />
                                            </div>
                                            <div className="capitalize">
                                                <span className="font-bold">
                                                    {username}
                                                </span>
                                                <span className="ml-1">
                                                    {moment(
                                                        createdAt
                                                    ).fromNow()}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between border-b border-t py-[0.5rem] border-gray-200">
                                              <div className="flex items-center gap-5">
                                                <Like/>
                                                <Comment />
                                              </div>
                                              <div className="flex items-center pt-2 gap-5">
                                                <Actions/>
                                              </div>
                                            </div>
                                            <div className="mt-[1rem]">
                                              <img className="w-full h-[400px] object-cover" src={img}/>
                                              <div className="mt-6" dangerouslySetInnerHTML={{__html:text}}></div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </main>
            )}
        </>
    );
};

export default Post;
