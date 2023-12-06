import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css'
import Auth from "./Auth/Auth";
const DemoHeader = () =>{
    const [modal, setModal] = useState(false);
    return (
        <section className={styles.header}>
                <nav>
                    <Link className={styles.logo} to='/'>Simple Blog</Link>
                    <input type="checkbox" id="hamburger" />
                    <label htmlFor="hamburger">
                        <i
                            className="fa-solid fa-square-caret-down fa-2xl"
                            style={{color: 'fff'}}
                        ></i>
                    </label>
                    <ul>
                        <li>
                            <Link to='/' className={styles.active}>Home</Link>
                        </li>
                        <li onClick={() => setModal(true)}>
                            <Link>Sign In</Link>
                        </li>
                        <Auth modal={modal} setModal={setModal}/>
                        <li>
                            <Link to="#FAQ">Articles</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Article</Link>
                        </li>
                        
                    </ul>
                </nav>
                <div className={styles.pic}></div>
            </section>
            
    )
}
export default DemoHeader