import React from "react";
import { LiaCommentDotsSolid } from "react-icons/lia";

const Comment = () => {
    return (
        <button className="flex items-center gap-1 text-md">
            <LiaCommentDotsSolid className="text-xl"/>
            <span>1</span>
        </button>
    );
};

export default Comment;
