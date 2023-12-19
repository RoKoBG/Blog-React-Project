import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { Blog } from "../../../contexts/context";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";
import useSingleFetch from "../../hooks/useSingleFetch";

const Like = ({ post, postId }) => {
    const { currUser } = Blog();
    const { data } = useSingleFetch("posts", postId, "like");

    useEffect(() => {
        setLike(
            data && data.findIndex((item) => item.id === currUser?.uid) !== -1
        );
    }, [data]);
    const [isLiked, setLike] = useState(false);
    const handleSubmit = async () => {
        try {
            if (currUser) {
                const ref = doc(db, "posts", postId, "like", currUser?.uid);
                if (isLiked) {
                    await deleteDoc(ref);
                } else {
                    await setDoc(ref, {
                        userId: currUser?.uid,
                    });
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <button
            onClick={handleSubmit}
            className="flex items-center gap-1 text-md"
        >
            <BiLike className={`text-xl ${isLiked? "text-black":"text-gray-600"}`} />
            <span>{data?.length}</span>
        </button>
    );
};

export default Like;
