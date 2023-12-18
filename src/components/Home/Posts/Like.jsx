import React from "react";
import { BiLike } from "react-icons/bi";

const Like = () => {
    return (
        <button className="flex items-center gap-1 text-md">
            <BiLike  className="text-xl"/>
            <span>1</span>
        </button>
    );
};

export default Like;
