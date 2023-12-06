import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from '../Home/Home.module.css'

const Home = () => {
    return (
        <>
            <Header />
            <>
            <section className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.box}>
                        <div className={styles['articles-header']}>ARTICLES</div>
                        <div className={styles["article-wrapper"]}>
                        <div className={styles["article-box"]}>

                                <img className={styles['article-img']} src="./src/assets/article.jpg" alt="articles image"/>
                                <div className={styles.wrapper}>
                                    
                                    <div className={styles.author}>Author: John Doe</div>
                                    <h3>Name of the article</h3>
                                    <p>articles text</p>
                                    <p>Created on: 14/12/1995</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                <div className={styles.right}>
                    <div className={styles.box}>
                        <div className={styles['articles-header']}>LATEST ARTICLES</div>
                        <p>dsadasdsadsadsada</p>
                    </div>
                </div>
            </section>
            </>
            <Footer />
        </>
    );
};
export default Home;
