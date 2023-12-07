import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import Load from '../components/Load/Load'
const BlogContext = createContext();

const Context = ({ children }) => {
    const [currUser, setCurrUser] = useState(false);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setLoad(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrUser(user);
            } else {
                setCurrUser(null);
            }
            setLoad(false);
        });
        return () => {
            unsubscribe();
        };
    }, [currUser]);
    return (
        <div>
            <BlogContext.Provider value={{ currUser, setCurrUser }}>
                {load ? <Load /> : children}
            </BlogContext.Provider>
        </div>
    );
};

export default Context;

export const Blog = () => {
    useContext(BlogContext);
};
