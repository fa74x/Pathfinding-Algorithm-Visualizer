import React, { useState } from 'react';
import Logo from "../images/icons/pathfinding-thick.png"
import Distance from "../images/icons/distance.png"
import DFSgif from "../images/gifs/bfs.gif"
import "./Tutorial.css"



export default function Tutorial({ changeModalState }) {
    const defaultTitle = "Welcome to the Pathfinding Algorithm Visualizer!"
    const defaultText = "This tool will allow you to visualize how pathfinding algorithms work, and hopefully help you better understand them."
    const next = "Next"
    const [title, setTitle] = useState(defaultTitle);
    const [text, setText] = useState(defaultText);
    const [img, setImg] = useState(Logo);
    const [btntxt, setBtntxt] = useState(next)
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
                setBtntxt(next)
                try {
                    document.getElementById('temp').id = 'hide'
                    document.getElementById('tutorial-gif').id = 'tutorial-img'
                } catch { }
                break
            case 2:
                try {
                    document.getElementById('hide').id = 'temp'
                } catch { }
                try {
                    document.getElementById('tutorial-gif').id = 'tutorial-img'
                } catch { }
                setTitle("What is a path-finding algorithm?");
                setText("In essence, a path-finding algorithm searches for a path between two points. They are generally used for navigation, routing, and other applications where finding the shortest path is important. This application visualizes several algorithms in action.")
                setImg(Distance)
                setBtntxt("Next")
                break
            case 3:
                setTitle("Breadth First Search (BFS)");
                setText("BFS is an algorithm used to find the shortest path from a given source vertex to all other vertices in the graph. It starts with the source vertex and visits all the vertices connected to it, before moving on to the next vertex in the queue. It can also be used to determine whether a graph is connected or not.")
                setImg(DFSgif)
                setBtntxt("Finish")
                try {
                    document.getElementById('tutorial-img').id = 'tutorial-gif'
                } catch {
                    document.getElementById('tutorial-gif').id = 'tutorial-img'
                }
                break
            case 4:
                changeModalState(false)
                break
        }
    }

    return (
        <div className="tutorial-box">
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <img id="tutorial-img" src={img} />
                <div className="buttonBar">
                    <button className="tutorial-button-close" onClick={() => changeModalState(false)} >Close</button>
                    <button className="tutorial-button" onClick={() => Previous(count, changeModalState)} id="hide">Previous</button>
                    <button className="tutorial-button" onClick={() => Next(count, changeModalState)}>{btntxt}</button>
                </div>
            </div>
        </div>
    )
}
