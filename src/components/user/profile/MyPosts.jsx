import React from "react";
import useDataFetch from "../../hooks/useDataFetching";
import PostCard from "../../Home/Posts/PostCard"
import Load from "../../Load/Load"

function MyPosts({ getUser }) {
    const { data, load } = useDataFetch("posts");
    const userPost =
        data && data?.filter((post) => post?.userId === getUser?.userId);
    
    return (
        <div className="flex flex-col gap-5 mb-[4rem]">

            {userPost.length === 0 && (
                <p className="text-gray-500">
                    <span className="capitalize font-semibold">
                        {getUser?.username}
                    </span>
                    has no posts yet.
                </p>
            )}
            {load ? <Load/> : userPost.map((post,i)=> <PostCard key={i} post={post}/>)}
        </div>
    );
}

export default MyPosts;
