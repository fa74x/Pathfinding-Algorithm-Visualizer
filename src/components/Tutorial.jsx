import Logo from "../images/icons/pathfinding-thick.png"

function TutorialFirst({ changeModalState }) {
    return (
        <div>
            <h3>Bienvenido al Visualizador de Algoritmos de Búsqueda de Caminos en Grafos</h3>
            <p>Este corto tutorial te guiará a través de la aplicación.
                <br />
                Si quieres comenzar ahora, presiona el botón "Skip".
                <br />
                De lo contrario presiona "Siguiente"</p>
            <img src={Logo} />
            <div className="buttonBar">
                <button className="tutorialBtn" onClick={() => changeModalState(false)} >Skip</button>
                <button className="tutorialBtn" id="hide">Anterior</button>
                <button className="tutorialBtn">Siguiente</button>
            </div>
        </div>
    )
}

export default function Tutorial({ changeModalState }) {
    return (
        <div className="welcome-box">
            {<TutorialFirst changeModalState={changeModalState}/>}
        </div>
    )
}
