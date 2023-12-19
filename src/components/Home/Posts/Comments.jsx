import React, { useState } from "react";
import Modal from "../../../utils/Modal";
import { FaRegComment } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { Blog } from "../../../contexts/context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";
import useSingleFetch from "../../hooks/useSingleFetch";
import Load from "../../Load/Load";
import Comment from "./Comment";
import { useEffect } from "react";

const Comments = ({ postId }) => {
    const { currUser, allUsers, setShowComm, showComm, setCommLength, commLength } = Blog();
    const [comment, setComment] = useState("");
    const [commData, setCommData] = useState([]);

    const def =
        "https://firebasestorage.googleapis.com/v0/b/simple-blog-a8b2d.appspot.com/o/image%2Fprofile.png?alt=media&token=09c89f19-c637-4628-b82c-f933b5a37c89";

    const userData = allUsers.find((user) => user.id === currUser?.uid);
    const { data, load } = useSingleFetch("posts", postId, "comments");

    console.log(data);

    const sendComment = async () => {
        try {
            if (comment === "") {
                toast.error("You need to write something...");
            }
            const ref = collection(db, "posts", postId, "comments");
            await addDoc(ref, {
                comment: comment,
                createdAt: Date.now(),
                userId: currUser?.uid,
            });
            toast.success("Comment has been created!");
            setComment("");
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        if (data) {
            setCommLength(data.length);
        }
    }, [data]);

    return (
        <Modal setModal={setShowComm} modal={showComm}>
            <button onClick={() => setShowComm(true)}>
                <FaRegComment />
            </button>
            <p>{data.length}</p>
            <section
                className={`fixed top-50 bottom-20 right-25 z-50 bg-white w-[55rem] h-[40rem] p-5 border-2
                ${showComm ? "translate-x-0" : "translate-x-[100rem]"}
                `}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Comments: {data?.length}</h2>
                    <button
                        onClick={() => setShowComm(false)}
                        className="text-xl"
                    >
                        <LiaTimesSolid />
                    </button>
                </div>
                {currUser && (
                    <div className="p-3 my-5 overflow-hidden">
                        <div className="flex items-center gap-2 mb-5">
                            <img
                                className="w-[2rem] h-[2rem] object-cover rounded-full"
                                src={userData?.userImg || { def }}
                                alt="img"
                            />
                            <h2 className="capitalize text-sm font-bold">
                                {userData?.username}
                            </h2>
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder="Your comment here.."
                                className="w-[70%] outline-none resize-none text-sm border px-2 pt-4"
                            ></textarea>
                            <button
                                onClick={() => setComment("")}
                                className="text-sm bg-red-500 p-4 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={sendComment}
                                className="text-sm bg-green-500 p-4 text-white rounded-md"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
                {data && data.length === 0 ? (
                    <p>Be the first to comment.</p>
                ) : (
                    data &&
                    data.map((item, i) =>
                        load ? (
                            <Load />
                        ) : (
                            <Comment
                                def={def}
                                postId={postId}
                                item={item}
                                key={i}
                            />
                        )
                    )
                )}
            </section>
        </Modal>
    );
};

export default Comments;
