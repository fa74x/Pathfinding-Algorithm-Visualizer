import Header from "./components/Header.jsx"
import Backdrop from "./components/Backdrop.jsx"
import Tutorial from "./components/Tutorial.jsx"
import Modal from "./components/Modal.jsx"
import { useState } from "react";
import "./index.css"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

function App() {
  const [openModal, setOpenModal] = useState(false);

  const close = () => setOpenModal(false);
  const open = () => setOpenModal(true);

  return (
    <div>
      <Header changeModalState={setOpenModal} />
      {openModal && <Backdrop changeModalState={setOpenModal} />}
      <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
        {openModal && <Modal changeModalState={setOpenModal} handleClose={true} />}
      </AnimatePresence>
    </div>
  );
}


export default App;