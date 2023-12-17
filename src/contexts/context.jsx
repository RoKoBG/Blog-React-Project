import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase/fb";
import Load from "../components/Load/Load";
import { collection, onSnapshot, query } from "firebase/firestore";

const BlogContext = createContext();

const Context = ({ children }) => {
    const [currUser, setCurrUser] = useState(false);
    const [load, setLoad] = useState(true);
    const [userLoad, setUserLoad] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [post, setPost] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrUser(user);
            } else {
                setCurrUser(null);
            }
            setLoad(false);
        });
        return () => unsubscribe();
    }, [currUser]);

    useEffect(() => {
        const getUsers = () => {
            const usersRef = query(collection(db, "users"));
            onSnapshot(usersRef, (snap) => {
                setAllUsers(
                    snap.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setUserLoad(false);
            });
        };
        getUsers();
    }, []);

    return (
        <BlogContext.Provider
            value={{ currUser, setCurrUser, allUsers, userLoad, post, setPost }}
        >
            {load ? <Load /> : children}
        </BlogContext.Provider>
    );
};
export default Context;
export const Blog = () => useContext(BlogContext);
