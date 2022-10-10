import React, { useState, useEffect } from "react"
import Astar from "../algorithms/astar.jsx"
import Node from "../PathfindingVisualizer/Node/Node";
import "./PathfindingVisualizer.css"
const cols = 24;
const rows = 15;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_FINISH_ROW = rows - 1;
const NODE_FINISH_COL = cols - 1;

const grid = new Array(rows);

const PathfindingVisualizer = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);
    const [mousePressed, setMousePressed] = useState(false);

    useEffect(() => {
        initializeGrid();
    }, []);

    //CREATES THE GRID
    const initializeGrid = (first) => {
        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }


        createSpot(grid);

        setGrid(grid);

        addNeighbours(grid);

        if (first) {
            cleanGrid();
        }

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];
        let path = Astar(startNode, finishNode);
        path.path = path.path.reverse();
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    };

    //CLEARS GRID
    const clearGrid = () => {
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let node = grid[i][j];
                node.isWall = false;
                node.f = 0;
                node.g = 0;
                node.h = 0;
                if (node.isStart) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-start";
                } else if (node.isEnd) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-end";
                } else {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node";
                }
            }
        }

        setGrid(grid);

        addNeighbours(grid);

        let path = Astar(startNode, finishNode);
        path.path = path.path.reverse();
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    }

    //CLEAN GRID
    const cleanGrid = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let node = grid[i][j];
                if (node.isStart) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-start";
                } else if (node.isEnd) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-end";
                } else if (node.isWall) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-wall";
                } else {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node";
                }
            }
        }
    }

    //CHANGE WALL NODE
    function changeWall(i, j) {
        if (grid[i][j].isWall == false) {
            grid[i][j].isWall = true;
        } else {
            grid[i][j].isWall = false;
        }

        setGrid(grid);

        addNeighbours(grid);

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];
        let path = Astar(startNode, finishNode);
        path.path = path.path.reverse();
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    }

    //CREATES THE SPOT
    const createSpot = (grid) => {
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    //ADD NEIGHBOURS
    const addNeighbours = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].addneighbours(grid);
            }
        }
    }

    //SPOT CONSTRUCTOR
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_FINISH_ROW && this.y === NODE_FINISH_COL;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.isWall = false;
        if (Math.random(1) < 0.3 && !this.isStart && !this.isEnd) {
            this.isWall = true;
        }
        this.previous = undefined;
        this.addneighbours = function (grid) {
            let i = this.x;
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i + 1][j])
            if (j > 0) this.neighbours.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j + 1])
        }
    }

    //GRID WITH NODE
    const gridWithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row-wrapper">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return (
                                <div
                                    className="pointer"
                                    onClick={() => changeWall(rowIndex, colIndex)}
                                    onDragEnter={() => changeWall(rowIndex, colIndex)}>
                                    <Node
                                        key={colIndex}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        row={rowIndex}
                                        col={colIndex}
                                        isWall={isWall}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div >
    );


    const visualizeShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
            }, 50 * i)
        }
    }


    const visualizePath = () => {
        cleanGrid();

        for (let i = 0; i <= VisitedNodes.length; i++) {
            if (i === VisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(Path);
                }, 16 * i);
            } else {
                setTimeout(() => {
                    const node = VisitedNodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                }, 15 * i)
            }
        }
    };


    return (
        <div className="wrapper">
            <div className="guide">
                <h3>Unvisited Node</h3><div className="node node-guide-unvisited" />
                <h3 style={{ paddingLeft: "25px" }}>Visited Node</h3><div className="node node-guide-visited" />
                <h3 style={{ paddingLeft: "25px" }}>Path Node</h3><div className="node node-guide-path" />
                <h3 style={{ paddingLeft: "25px" }}>Wall Node</h3><div className="node node-guide-wall" />
            </div>
            {gridWithNode}
            <div className="btn-bar">
                <button className="btn-visualize orange" onClick={initializeGrid}>⠀Randomize⠀</button>
                <button className="btn-visualize skyblue" onClick={visualizePath}>⠀Visualize Path⠀</button>
                <button className="btn-visualize orange" onClick={clearGrid}>⠀Clear Grid⠀</button>
            </div>
        </div >
    );
};

export default PathfindingVisualizer;