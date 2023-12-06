import React, { createContext, useContext, useState } from "react";
const BlogContext = createContext();
const Context = ({ children }) => {
    const [currUser, setCurrUser] = useState(false);
    return (
        <div>
            <BlogContext.Provider value={{ currUser, setCurrUser }}>
                {children}
            </BlogContext.Provider>
        </div>
    );
};
export default Context;

export const Blog = () => {
    useContext(BlogContext);
};
