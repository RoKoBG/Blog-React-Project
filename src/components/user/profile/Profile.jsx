import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import EditProfile from "./EditProfile";
import MyPosts from "./MyPosts";
import styles from "../profile/Profile.module.css";

import { Blog } from "../../../contexts/context";
import { useParams } from "react-router-dom";

const Profile = () => {
    const [editModal, setEditModal] = useState(false);
    const { allUsers } = Blog();
    const { userId } = useParams();
    const userImg= 'https://firebasestorage.googleapis.com/v0/b/simple-blog-a8b2d.appspot.com/o/image%2Fprofile.png?alt=media&token=09c89f19-c637-4628-b82c-f933b5a37c89'
    const getUserData = allUsers.find((user) => user.id === userId);
console.log(getUserData);
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
                                            My ARTICLES
                                        </h1>
                                        <div className="py-1">
                                           <MyPosts getUser = {getUserData}/>
                                        </div>
                                    </div>
                                    <div className={styles.leftBox}>
                                        <h1 className={styles.h1}>
                                            User Details
                                        </h1>
                                        

                                        <div className="flex row w-[20rem] h-[20rem] justify-between">
                                            <img src={getUserData?.userImg || userImg} alt="profile-img" />

                                        </div>
                                        <p>Hello <span className="font-bold">{getUserData?.username}</span>! this is your profile information</p>
                                        <p>Your Email is: <span className="font-bold">{getUserData?.email}</span></p>
                                        <p>Your Bio: <span className="font-bold">{getUserData?.bio || "No info"}</span></p>
                                        
                                        <p>You can EDIT your profile whenever you want from the EDIT Button.</p>
                                        <button
                                            onClick={() => setEditModal(true)}
                                            className="text-blue-400 pt-5 w-fit"
                                            >
                                            Edit profile
                                        </button>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {editModal && (
                        <EditProfile
                        userImg ={userImg}
                        getUserData={getUserData}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        />
                    )}
                </section>
               
                <Footer />
            </main>
        </>
    );
};

export default Profile;
