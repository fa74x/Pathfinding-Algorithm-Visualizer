import Logo from "../images/icons/pathfinding-thick.png"
import Header from "../components/Header.js"

export default function Welcome( {changeModalState} ) {
    return (
        <div className="welcome-box">
            <h3>Bienvenido al Visualizador de Algoritmos de Búsqueda de Caminos en Grafos</h3>
            <p>Este corto tutorial te guiará a través de la aplicación.
                <br />
                Si quieres comenzar ahora, apretá el botón "Saltar Tutorial".
                <br />
                De lo contrario presiona "Siguiente"</p>
            <img src={Logo} />
            <div className="buttonBar">
                <button className="modalBtn" onClick={() => changeModalState(false)} >Skip</button>
                <button className="modalBtn">Previous</button>
                <button className="modalBtn">Next</button>
            </div>
        </div>
    )
}
