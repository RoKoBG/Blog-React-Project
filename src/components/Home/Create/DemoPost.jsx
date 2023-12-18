import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/fb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Blog } from "../../../contexts/context";
import { useNavigate } from "react-router-dom";

const DemoPost = ({ setPost, title, text }) => {
    const { currUser } = Blog();
    const navigate = useNavigate();
    const imgRef = useRef(null);
    const [load, setLoad] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [demo, setDemo] = useState({
        title: "",
        img: "",
    });
    useEffect(() => {
        if (title || text) {
            setDemo({ ...demo, title: title });
            setDesc(text);
        } else {
            setDemo({ ...demo, title: "" });
            setDesc("");
        }
    }, [title, text]);

    const handleClick = () => {
        imgRef.current.click();
    };

    const handleSubmit = async () => {
        setLoad(true);
        try {
            if (demo.title === "" || desc === "") {
                toast.error("All fields are required!");
                return;
            }

            if (demo.title.length < 15) {
                toast.error("Title length must be atleast 15 letters!");
                return;
            }
            const data = collection(db, "posts");
            const storageRef = ref(storage, `image/${demo.img.name}`);
            await uploadBytes(storageRef, demo?.img);
            const imgUrl = await getDownloadURL(storageRef);
            await addDoc(data, {
                userId: currUser?.uid,
                title: demo.title,
                text,
                img: imgUrl,
                createdAt: Date.now(),
            });
            toast.success("Post has been added!");
            navigate("/");
            setPost(false);
            setDemo({
                title: "",
                img: "",
            });
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }finally{
            setLoad(false);
        }
    };

    return (
        <section className="absolute inset-0 bg-white z-30 p-[2rem]">
            <div className="size my-[2rem]">
                <span
                    onClick={() => setPost(false)}
                    className="absolute right-[1rem] md:right-[5rem] top-[3rem] text-2xl cursor-pointer"
                >
                    <LiaTimesSolid />
                </span>
                <div className="mt-[8rem] flex flex-col md:flex-row gap-10">
                    <div className="flex-[1]">
                        <h3>Preview of your Post</h3>
                        <div
                            style={{ backgroundImage: `url(${imgUrl})` }}
                            onClick={handleClick}
                            className="w-full h-[200px] object-cover bg-gray-200 my-3 grid place-items-center bg-cover bg-no-repeat cursor-pointer"
                        >
                            {!imgUrl && "Add Image File"}
                        </div>
                        <input
                            onChange={(e) => {
                                setImgUrl(
                                    URL.createObjectURL(e.target.files[0])
                                );
                                setDemo({ ...demo, img: e.target.files[0] });
                            }}
                            ref={imgRef}
                            type="file"
                            hidden
                        />
                        <input
                            value={demo.title}
                            onChange={(e) =>
                                setDemo({ ...demo, title: e.target.value })
                            }
                            type="text"
                            placeholder="Title of the POST"
                            className="text-2xl outline-none w-full p-[0.2rem] mb-4 shadow-xl border"
                        />
                        <input type="file" hidden />
                        <ReactQuill
                            theme="bubble"
                            value={desc}
                            onChange={setDesc}
                            placeholder="Write your post..."
                            className="text-3xl outline-none  w-full p-[1rem] shadow-xl border"
                        />
                        <button
                            onClick={handleSubmit}
                            className="border border-teal-600 bg-teal-200 py-2 mt-4 px-5 rounded-lg text-teal-700"
                        >
                            {load? "Sending...":"Send"}
                        </button>
                    </div>
                    <div className="flex-[2]">right</div>
                </div>
            </div>
        </section>
    );
};

export default DemoPost;
