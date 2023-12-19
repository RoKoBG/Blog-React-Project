import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../contexts/context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/fb";
import { toast } from "react-toastify";

function Actions({ postId, title, text }) {
    const navigate = useNavigate();
    const { setEditData } = Blog();
    const handleEdit = () => {
        setEditData({ title, text });
        navigate(`/posts/${postId}/edit`);
    };
    const handleDelete = async () => {
        try {
            const ref = doc(db, "posts", postId);
            await deleteDoc(ref);
            toast.success('Post has been deleted!')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    };
    return (
        <div className="justify-evenly">
            <button onClick={handleDelete} className="text-2xl px-[2rem]">
                <RiDeleteBin2Line />
            </button>
            <button onClick={handleEdit} className="text-2xl">
                <FaEdit />
            </button>
        </div>
    );
}

export default Actions;
