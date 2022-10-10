import React, { useState } from 'react';
import Logo from "../images/icons/pathfinding-thick.png"
import Distance from "../images/icons/distance.png"
import "./Tutorial.css"



export default function Tutorial({ changeModalState }) {
    const defaultTitle = "Bienvenido al Visualizador de Algoritmos de Búsqueda de Caminos en Grafos"
    const defaultText = "Este corto tutorial te guiará a través de la aplicación. Si quieres comenzar ahora, presiona el botón \"Skip\". De lo contrario presiona \"Siguiente\""
    const siguiente = "Siguiente"
    const [title, setTitle] = useState(defaultTitle);
    const [text, setText] = useState(defaultText);
    const [img, setImg] = useState(Logo);
    const [btntxt, setBtntxt] = useState(siguiente)
    const [count, setCount] = useState(1);

    function Previous(count, changeModalState) {
        if (count > 1) {
            setCount(count => count - 1)
            TitleChange(count - 1, changeModalState)
        }
    }

    function Next(count, changeModalState) {
        setCount(count => count + 1)
        TitleChange(count + 1, changeModalState)
    }

    function TitleChange(i, changeModalState) {
        switch (i) {
            case 1:
                setTitle(defaultTitle)
                setText(defaultText)
                setImg(Logo)
                setBtntxt(siguiente)
                try {
                    document.getElementById('temp').id = 'hide'
                } catch { }
                break
            case 2:
                setTitle("Que es un Algoritmos de Búsqueda de Caminos en Grafos?");
                setText("En esencia, un algoritmo de búsqueda de caminos busca el camino más corto entre dos puntos. Esta aplicación visualiza varios algoritmos en acción")
                setImg(Distance)
                setBtntxt("Finalizar")
                try {
                    document.getElementById('hide').id = 'temp'
                } catch { }
                break
            case 3:
                changeModalState(false)
                break
        }
    }

    return (
        <div className="welcome-box">
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <img className="" src={img} />
                <div className="buttonBar">
                    <button className="tutorialBtn" onClick={() => changeModalState(false)} >Skip</button>
                    <button className="tutorialBtn" onClick={() => Previous(count, changeModalState)} id="hide">Anterior</button>
                    <button className="tutorialBtn" onClick={() => Next(count, changeModalState)}>{btntxt}</button>
                </div>
            </div>
        </div>
    )
}
