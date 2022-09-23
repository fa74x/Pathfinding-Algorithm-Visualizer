import Header from "./components/Header.js"
import DarkenBackground from "./components/DarkenBackground.js"
import Welcome from "./components/WelcomeTutorial.js"
import { useState } from "react";

import "./index.css"



function App() {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div>
      <Header changeModalState={setOpenModal} />
      {openModal && <Welcome changeModalState={setOpenModal} />}
      {openModal && <DarkenBackground changeModalState={setOpenModal} />}
    </div>
  );
}


export default App;