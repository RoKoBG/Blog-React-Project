import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/fb";

const useSingleFetch = (collName, id, subColl) => {
    const [data, setData] = useState("");
    const [load, setLoad] = useState(true);
    useEffect(() => {
        const getData = () => {
            const dataRef = query(collection(db, collName, id, subColl));
            onSnapshot(dataRef, (snap) => {
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
    }, [db, id]);
    return { data, load };
};

export default useSingleFetch;
