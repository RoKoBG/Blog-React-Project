import React from "react";
import styles from "./PostCard.module.css";
import useDataFetching from "../../hooks/useDataFetching";
import moment from "moment";
import { Blog } from "../../../contexts/context";
import Load from "../../Load/Load";
import Actions from "./Actions";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const { title, text, createdAt, img, id: postId, userId } = post;
    const { data, load } = useDataFetching("users");
    const {currUser}=Blog();
    const getUser = data && data?.find((user) => user?.id === userId);
    console.log(data);
    return (
        <>
            <div onClick={()=>navigate(`/post/${postId}`)} className={styles.postCont}>
            {load && <Load/>}
            <div className="flex-1">
                <img src={img} className="w-[53rem] h-[15rem]" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <span>
                <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize mb-2">{title}</h2>
                <p className="text-l pb-2 font-semibold capitalize">{getUser?.username}</p>

                </span>
                <div className="py-1 text-gray-500 line-clamp-2 leading-5" dangerouslySetInnerHTML={{__html: text}}/>
                <div className="flex-end">
                    <p className="text-l text-gray-600 mt-2 align-text-bottom">Posted on: <span className="font-semibold">{moment(createdAt).format("L LT")}</span></p>
                    {currUser?.uid === userId && <Actions post={post} />}
                    </div>
              
            </div>
            
            </div>
            
        </>
    );
};

export default PostCard;
