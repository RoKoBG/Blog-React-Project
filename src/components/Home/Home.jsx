import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Users from "./Users/Users";
import Posts from "./Posts/Posts";
import styles from "../Home/Home.module.css";
const Home = () => {
    return (
        <>
            <Header />
            <>
                <section className={styles.main}>
                    <div className={styles.left}>
                        <div className={styles.box}>
                            <div className={styles["articles-header"]}>
                                ARTICLES
                            </div>
                            <div className={styles["article-wrapper"]}>
                                <Posts />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.box}>
                            <div className={styles["articles-header"]}>
                                USERS
                            </div>
                            <Users />
                        </div>
                    </div>
                </section>
            </>
            <Footer />
        </>
    );
};
export default Home;
