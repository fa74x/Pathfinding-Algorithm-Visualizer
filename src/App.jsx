import Header from "./components/Header.jsx"
import Modal from "./components/Modal.jsx"
import { useState, useEffect } from "react";
import "./style.css"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import PathfindingVisualizer from "./components/PathfindingVisualizer/PathfindingVisualizer.jsx";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Header changeModalState={setOpenModal} />
      <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
        {openModal && <Modal changeModalState={setOpenModal} handleClose={true} />}
      </AnimatePresence>
      <PathfindingVisualizer />
    </div>
  );
}


export default App;