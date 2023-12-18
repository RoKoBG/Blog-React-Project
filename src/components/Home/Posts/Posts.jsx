import React from "react";
import useDataFetching from "../../hooks/useDataFetching";

import styles from "../Posts/Posts.module.css";
import Load from "../../Load/Load";
import PostCard from "../Posts/PostCard";
const Posts = () => {
    const { data, load } = useDataFetching("posts");
    console.log(data);
    return (
        <section className={styles.postCol}>
            {load ? <Load /> : data.map((post, i) => <PostCard key={i} post={post}/>)}
        </section>
    );
};

export default Posts;
