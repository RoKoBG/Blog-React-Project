import React, { useState } from "react";
import useDataFetching from "../../hooks/useDataFetching";
import { Blog } from "../../../contexts/context";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";


const Users = () => {
    const {currUser} = Blog();
    const {data, loading} = useDataFetching("users");
    const [count, setCount] = useState(5);
    const users = data && data?.slice(0,count).filter((user)=>user.userId!== currUser?.uid);

    return (
        <>
        {data && users?.map((user,i)=>{
            const {username,bio,userImg, userId} = user;
            return (
                <div key={i} className="flex items-start gap-2 my-4">
                <div className="flex-1 flex items-center gap-2 cursor-pointer">
                <img className="w-[3rem] h-[3rem] object-cover gap-2 cursor-pointer rounded-full" src={userImg}/>
                <div className="flex flex-col gap-1">
                    <h2 className="font-semibold capitalize">{username}</h2>
                    <span className="leading-4 text-gray-500 text-sm line-clamp-2">{bio|| "No bio..."}</span>
                </div>
                </div>
                <Link
                                    key={userId}
                                    to={`/profile/${userId}`}
                                >
               <button className="bg-gray-200 border border-gray px-3 py-[0.2rem] rounded-md">Profile</button>
                                    
                                </Link>
                </div>
            );
        })}
        </>
    );
};

export default Users;
