import React from "react";
import { Link } from "react-router-dom";
import styles from './Header.module.css'
import Auth from "./Auth/Auth";
const DemoHeader = () =>{
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
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <Auth/>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Article</Link>
                        </li>
                        <li>
                            <Link to="#FAQ">F.A.Q</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.pic}></div>
            </section>
            
    )
}
export default DemoHeader