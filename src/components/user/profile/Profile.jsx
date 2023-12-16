import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import styles from "../profile/Profile.module.css";

import { Blog } from "../../../contexts/context";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { allUsers } = Blog();
    const { userId } = useParams();
    const getUserData = allUsers.find((user) => user.id === userId);
    console.log(userId);

    return (
        <>
            <main className={styles.container}>
                <Header />
                <section className={styles.main}>
                    <div className={styles.left}>
                        <div className={styles.box}>
                            <div className={styles["articles-header"]}>
                                PROFILE SECTION
                            </div>
                            <div className={styles["article-wrapper"]}>
                                <div className={styles["article-box"]}>
                                    <div className={styles.rightBox}>
                                        <h1 className={styles.h1}>
                                            {getUserData?.username}
                                        </h1>
                                        <h2 className={styles.h2}>
                                            My articles
                                        </h2>
                                    </div>
                                    <div className={styles.leftBox}>
                                        <h1 className={styles.h1}>
                                            User Details
                                        </h1>
                                        <p> {getUserData?.username}</p>
                                        <p>Email:  {getUserData?.email}</p>
                                        <p>Bio:</p>
                                        <p className={styles.bio}>
                                        {getUserData?.bio}
                                        </p>
                                        <button className="text-blue-400 pt-5 w-fit">
                                            Edit profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default Profile;
