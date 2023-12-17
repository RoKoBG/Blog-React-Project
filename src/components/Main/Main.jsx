import React from "react";
import styles from '../Main/Main.module.css'
import Home from '../Home/Home'
import { Blog } from "../../contexts/context";
import Load from "../Load/Load";
const Main = () =>{
    const {userLoad} = Blog();
    return (
         
        
        <main className={styles.container}>
                   {userLoad && <Load/>}
            <Home/>
        </main>
    );

}

export default Main;