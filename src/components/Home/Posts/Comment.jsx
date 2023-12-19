import React from "react";
import { Blog } from "../../../contexts/context";
import moment from "moment";
import { LuDelete } from "react-icons/lu";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";

const Comment = ({ item: comments, postId, def }) => {
    const { allUsers, currUser } = Blog();
    const getUser = allUsers.find((user) => user.id === comments?.userId);
    const { userId, comment, createdAt } = comments;
    console.log(comments.id);
    const removeComment = async () => {
        try {
            const ref = doc(db, "posts", postId, "comments", comments?.id);
            await deleteDoc(ref);
            toast.success("Your comment was deleted");
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    return (
        <section className="border-b">
            <div className="flex items-center gap-5">
                <img
                    className="w-[2rem] h-[2rem] object-cover round-full"
                    src={getUser?.userImg || { def }}
                    alt="img"
                />
                <div className="flex-1 flex justify-between">
                    <div>
                        <h2 className="text-sm capitalize">
                            {getUser?.username}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {moment(createdAt).fromNow()}
                        </p>
                    </div>
                    <div className="relative">
                        {currUser && currUser?.uid === userId && (
                            <>
                                <button onClick={removeComment} className="text-2xl !hover:none">
                                    <LuDelete />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <p className="py-4 text-sm">{comment}</p>
        </section>
    );
};

export default Comment;
