import React, { useState } from 'react';
import Logo from "../images/icons/pathfinding-thick.png"
import Distance from "../images/icons/distance.png"
import BFSgif from "../images/gifs/bfs.gif"
import DFSgif from "../images/gifs/dfs.gif"
import wallgif from "../images/gifs/wall.gif"
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
                    document.getElementById('tutorial-img-2').id = 'tutorial-img-1'
                } catch { }
                break
            case 2:
                try {
                    document.getElementById('hide').id = 'temp'
                } catch { }
                try {
                    document.getElementById('tutorial-img-1').id = 'tutorial-img-2'
                } catch { }
                try {
                    document.getElementById('tutorial-gif').id = 'tutorial-img-2'
                } catch { }
                setTitle("What is a path-finding algorithm?");
                setText("In essence, a path-finding algorithm searches for a path between two points. They are generally used for navigation, routing, and other applications where finding the shortest path is important. This application visualizes several algorithms in action.")
                setImg(Distance)
                setBtntxt("Next")
                break
            case 3:
                setTitle("Breadth First Search (BFS)");
                setText("BFS is an algorithm used to find the shortest path from a given source node to all other nodes in the graph. It starts with the source node and visits all the nodes connected to it, before moving on to the next node in the queue. It can also be used to determine whether a graph is connected or not.")
                setImg(BFSgif)
                setBtntxt("Next")
                try {
                    document.getElementById('tutorial-img-2').id = 'tutorial-gif'
                } catch { }
                break
            case 4:
                setTitle("Depth First Search (DFS)");
                setText("DFS is another pathfinding algorithm. It starts at the source node of a graph and explores as far as possible along each branch before backtracking. It uses a stack data structure to keep track of the nodes it has visited, and returns a path from the root node to the goal node.")
                setImg(DFSgif)
                setBtntxt("Next")
                break
            case 5:
                setTitle("Adding Walls");
                setText("You can click or click and drag to create walls.")
                setImg(wallgif)
                setBtntxt("Finish")
                break
            case 6:
                changeModalState(false)
                break
        }
    }

    return (
        <div className="tutorial-box">
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <img id="tutorial-img-1" src={img} />
                <div className="button-bar">
                    <button className="tutorial-button-close" onClick={() => changeModalState(false)} >Close</button>
                    <button className="tutorial-button" onClick={() => Previous(count, changeModalState)} id="hide">Previous</button>
                    <button className="tutorial-button" onClick={() => Next(count, changeModalState)}>{btntxt}</button>
                </div>
            </div>
        </div>
    )
}
