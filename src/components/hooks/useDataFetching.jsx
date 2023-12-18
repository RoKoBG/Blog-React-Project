import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/fb";
const useDataFetching = (collName) => {
    const [data, setData] = useState("");
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const getData = () => {
            const usersRef = query(
                collection(db, collName),orderBy("createdAt", "desc")
                
            );
            onSnapshot(usersRef, (snap) => {
                setData(
                    snap.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoad(false);
            });
        };
        getData();
    }, []);
    return { data, load };
};

export default useDataFetching;
