import { useEffect, useRef, useState } from "react";
import Modal from "../../../utils/Modal";
import styles from "./EditProfile.module.css";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/fb";
import { doc, updateDoc } from "firebase/firestore";

const EditProfile = ({ editModal, setEditModal, getUserData }) => {
    const imgRef = useRef(null);
    const [imgUrl, setImgUrl] = useState("");
    const [load, setLoad] = useState(false);
    const [form, setForm] = useState({
        username: "",
        userImg: "",
        bio: "",
    });

    useEffect(() => {
        if (getUserData) {
            setForm(getUserData);
        } else {
            setForm({ username: "", userImg: "", bio: "" });
        }
    }, [getUserData]);

    const saveForm = async () => {
        if (form["username"] === "" || form["bio"] === "") {
            toast.error("All fields are required!");
            return;
        }

        setLoad(true);

        const storageRef = ref(storage, `image/${form.userImg.name}`);
        await uploadBytes(storageRef, form?.userImg);
        const imageUrl = await getDownloadURL(storageRef);
        try {
            const docRef = doc(db, "users", getUserData?.userId);
            await updateDoc(docRef, {
                bio: form.bio,
                userImg: imgUrl ? imageUrl: form.userImg,
                username: form.username,
                userId: getUserData?.userId,
            });
            setLoad(false);
            setEditModal(false);
            toast.success("Profile updated!")
        } catch (err) {
            toast.error(err.message);
        }
    };

    const openFile = () => {
        imgRef.current.click();
    };
    return (
        <Modal modal={editModal} setModal={setEditModal}>
            <div className={styles.center}>
                <div className="flex items-center justify-between">
                    <h2 className={styles.h2}>Edit profile</h2>
                    <button
                        onClick={() => setEditModal(false)}
                        className="text-xl"
                    >
                        <LiaTimesSolid />
                    </button>
                </div>
                <section className={styles.profile}>
                    <p className={styles.p}>Profile photo</p>
                    <div className={styles.imgContainer}>
                        <div className={styles.container}>
                            <img
                                className={styles.profileImg}
                                src={
                                    imgUrl
                                        ? imgUrl : form.userImg ? form.userImg
                                        : "./assets/profile.png"
                                }
                                alt="profile-img"
                            />
                            <div className={styles.btns}>
                                <button
                                    onClick={openFile}
                                    className="text-green-600"
                                >
                                    Change
                                </button>
                                <button className="text-red-600">Remove</button>
                            </div>
                            <input
                                onChange={(e) => {
                                    setImgUrl(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                    setForm({
                                        ...form,
                                        userImg: e.target.files[0],
                                    });
                                }}
                                accept="image/jpg, image/png, image/jpeg"
                                ref={imgRef}
                                type="file"
                                hidden
                            />
                        </div>
                    </div>
                </section>
                <section className={styles.mid}>
                    <p className="pb-3 block">Name*</p>
                    <input
                        onChange={(e) => {
                            setForm({ ...form, username: e.target.value });
                        }}
                        value={form.username}
                        type="text"
                        placeholder="username"
                        className="p-1 border border-black w-full outline-none"
                        maxLength={25}
                    />
                                        <p>Max characters: {form.username.length}/25</p>

                    <p className="pb-3 block mt-2">Bio*</p>
                    <input
                        onChange={(e) => {
                            setForm({ ...form, bio: e.target.value });
                        }}
                        value={form.bio}
                        type="text"
                        placeholder="Information about you."
                        className="p-1 border border-black w-full h-full outline-none"
                        maxLength={150}
                    />
                    <p>Max characters: {form.bio.length}/150</p>
                </section>
                <div className="flex items-cente justify-end gap-4 pt-[2rem]">
                    <button
                        onClick={() => setEditModal(false)}
                        className="border border-red-600 bg-red-200 py-2 px-5 rounded-lg text-red-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveForm}
                        className="border border-teal-600 bg-teal-200 py-2 px-5 rounded-lg text-teal-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </Modal>
    );
};
export default EditProfile;
