import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import Tutorial from "./Tutorial";
import Logo from "../images/icons/pathfinding-thick.png"

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "1vh",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffnes: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = ({ changeModalState }) => {
    return (
        <div class="modal">
            <Backdrop onClick={changeModalState}></Backdrop>
            <motion.div onClick={(e) => e.stopPropagation()} variants={dropIn} initial="hidden" animate="visible" exit="exit">
                <Tutorial changeModalState={changeModalState}></Tutorial>
            </motion.div>
        </div>
    )
}

export default Modal;