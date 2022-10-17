import React, { useState, useEffect } from "react"
import Astar from "../algorithms/astar.jsx"
import DFS from "../algorithms/dfs.jsx"
import BFS from "../algorithms/bfs.jsx"
import Node from "../PathfindingVisualizer/Node/Node";
import "./PathfindingVisualizer.css"
const cols = 29;
const rows = 19;

var NODE_START_ROW = 2;
var NODE_START_COL = 2;
var NODE_FINISH_ROW = rows - 2;
var NODE_FINISH_COL = cols - 2;

const grid = new Array(rows);

const PathfindingVisualizer = () => {
    const [Grid, setGrid] = useState([]);
    const [AstarPath, setAstarPath] = useState([]);
    const [AstarVisitedNodes, setAstarVisitedNodes] = useState([]);
    const [BFSPath, setBFSPath] = useState([]);
    const [BFSVisitedNodes, setBFSVisitedNodes] = useState([]);
    const [DFSPath, setDFSPath] = useState([]);
    const [DFSVisitedNodes, setDFSVisitedNodes] = useState([]);

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

        let astarpath = Astar(startNode, finishNode);
        astarpath.path = astarpath.path.reverse();
        setAstarPath(astarpath.path);
        setAstarVisitedNodes(astarpath.visitedNodes);

        let bfspath = BFS(startNode, finishNode);
        bfspath.path = bfspath.path.reverse();
        setBFSPath(bfspath.path);
        setBFSVisitedNodes(bfspath.visitedNodes);

        let dfspath = DFS(startNode, finishNode);
        dfspath.path = dfspath.path.reverse();
        setDFSPath(dfspath.path);
        setDFSVisitedNodes(dfspath.visitedNodes);
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

        let astarpath = Astar(startNode, finishNode);
        astarpath.path = astarpath.path.reverse();
        setAstarPath(astarpath.path);
        setAstarVisitedNodes(astarpath.visitedNodes);

        let bfspath = BFS(startNode, finishNode);
        bfspath.path = bfspath.path.reverse();
        setBFSPath(bfspath.path);
        setBFSVisitedNodes(bfspath.visitedNodes);

        let dfspath = DFS(startNode, finishNode);
        dfspath.path = dfspath.path.reverse();
        setDFSPath(dfspath.path);
        setDFSVisitedNodes(dfspath.visitedNodes);
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
        if (!grid[i][j].isStart && !grid[i][j].isEnd) {
            if (grid[i][j].isWall == false) {
                grid[i][j].isWall = true;
            } else {
                grid[i][j].isWall = false;
            }

            setGrid(grid);

            addNeighbours(grid);

            cleanGrid();

            const startNode = grid[NODE_START_ROW][NODE_START_COL];
            const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];

            let astarpath = Astar(startNode, finishNode);
            astarpath.path = astarpath.path.reverse();
            setAstarPath(astarpath.path);
            setAstarVisitedNodes(astarpath.visitedNodes);

            let bfspath = BFS(startNode, finishNode);
            bfspath.path = bfspath.path.reverse();
            setBFSPath(bfspath.path);
            setBFSVisitedNodes(bfspath.visitedNodes);

            let dfspath = DFS(startNode, finishNode);
            dfspath.path = dfspath.path.reverse();
            setDFSPath(dfspath.path);
            setDFSVisitedNodes(dfspath.visitedNodes);
        }
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

    //ADD NEIGHBOURS
    const addNeighbours = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].addneighbours(grid);
            }
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

    //MAZE 1
    function Maze1() {
        for (let i = 1; i < cols; i++) {
            grid[0][i].isWall = true;
        }

        setGrid(grid);

        addNeighbours(grid);

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const finishNode = grid[NODE_FINISH_ROW][NODE_FINISH_COL];

    }


    const visualizeShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                const next_node = shortestPathNodes[i + 1];
                if (next_node.y > node.y) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path-r";
                } else if (next_node.y < node.y) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path-l";
                } else if (next_node.x > node.x) {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path-d";
                } else {
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path-u";
                }
            }, 50 * i)
        }
        let node = shortestPathNodes[shortestPathNodes.length - 1];
        setTimeout(() => {
            document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path-end";
        }, shortestPathNodes.length * 50);
    }


    const visualizeAstarPath = () => {
        cleanGrid();

        for (let i = 0; i <= AstarVisitedNodes.length; i++) {
            if (i === AstarVisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(AstarPath);
                }, 16 * i);
            } else {
                setTimeout(() => {
                    const node = AstarVisitedNodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                }, 15 * i)
            }
        }
    };

    const visualizeBFSPath = () => {
        cleanGrid();

        for (let i = 0; i <= BFSVisitedNodes.length; i++) {
            if (i == 0) {
                const node = BFSVisitedNodes[0];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited-dot";
            } else if (i === BFSVisitedNodes.length) {
                setTimeout(() => {
                    const node = BFSVisitedNodes[i - 1];
                    if (node.isEnd) {
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited-dot";
                    }
                }, 15 * i);
                setTimeout(() => {
                    visualizeShortestPath(BFSPath);
                }, 17 * i);
            } else {
                setTimeout(() => {
                    const node = BFSVisitedNodes[i];
                    if (!node.isEnd) {
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                    }
                }, 15 * i)
            }
        }
    };

    const visualizeDFSPath = () => {
        cleanGrid();

        for (let i = 0; i <= DFSVisitedNodes.length; i++) {
            if (i == 0) {
                const node = DFSVisitedNodes[0];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited-dot";
            } else if (i === DFSVisitedNodes.length) {
                setTimeout(() => {
                    const node = DFSVisitedNodes[i - 1];
                    if (node.isEnd) {
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited-dot";
                    }
                }, 15 * i);
                setTimeout(() => {
                    visualizeShortestPath(DFSPath);
                }, 17 * i);
            } else {
                setTimeout(() => {
                    const node = DFSVisitedNodes[i];
                    if (!node.isEnd) {
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                    }
                }, 15 * i)
            }
        }
    }

    return (
        <div className="wrapper">
            <div className="guide">
                <h3>Unvisited Node</h3><div className="node node-guide-unvisited" />
                <h3 style={{ paddingLeft: "25px" }}>Visited Node</h3><div className="node node-guide-visited" />
                <h3 style={{ paddingLeft: "25px" }}>Path Node</h3><div className="node node-guide-path" />
                <h3 style={{ paddingLeft: "25px" }}>Wall Node</h3><div className="node node-guide-wall" />
            </div>
            <div className="grid">{gridWithNode}</div>
            <div className="btn-bar">
                <button className="btn-visualize orange" onClick={initializeGrid}>Randomize</button>
                {/* <button className="btn-visualize skyblue" onClick={visualizeAstarPath}>⠀Visualize A*⠀</button> */}
                <button className="btn-visualize skyblue" onClick={visualizeBFSPath}>Visualize BFS</button>
                <button className="btn-visualize skyblue" onClick={visualizeDFSPath}>Visualize DFS</button>
                <button className="btn-visualize orange" onClick={clearGrid}>Clear Grid</button>
            </div>
        </div >
    );
};

export default PathfindingVisualizer;