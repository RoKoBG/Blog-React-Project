import React from "react";
import styles from "../utils/Modal.module.css"
const Modal = ({children,modal, setModal}) =>{
    return (
        <>
    <div onClick={() => setModal(false)} className={`bg-white/50 fixed inset-0 z-10 ${modal ? 'visible opacity-100':'invisible opacity-0 '}transition-all duration-500`}></div>
      {children}</>
    )
}

export default Modal;