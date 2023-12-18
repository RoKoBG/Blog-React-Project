import React from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function Actions() {
    return (
        <div className="justify-evenly">
            <button className="text-2xl px-[2rem]">
                <RiDeleteBin2Line />
            </button>
            <button className="text-2xl">
                <FaEdit />
            </button>
        </div>
    );
}

export default Actions;
