import React from "react";
import Header from "../../../Header/Header"
import Footer from "../../../Footer/Footer"
import styles from "../create/Create.module.css"
const Create = () => {
    return (
        <>
        <main className={styles.container}>
        <Header/>
        <section className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.box}>
                        <div className={styles['articles-header']}>CREATE ARTICLE</div>
                        <div className={styles["article-wrapper"]}>
                        <div className={styles["article-box"]}>

                               <p>Inputs here</p>
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

export default Create;
