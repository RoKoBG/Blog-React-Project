import React from "react";
import styles from "../utils/Modal.module.css"
const Modal = ({children}) =>{
    return (
        <>
    <div className="bg-white/50 fixed inset-0 z-10"></div>
      {children}</>
    )
}

export default Modal;