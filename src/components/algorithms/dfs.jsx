function DFS(startNode, finishNode) {
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visitedNodes = [];

    openSet.push(startNode);
    while (openSet.length > 0) {
        let leastIndex = 0;

        let current = openSet[leastIndex];
        visitedNodes.push(current);
        if (current === finishNode) {
            let temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            //
            return { path, visitedNodes };
            //
        }

        openSet = openSet.filter((elt) => elt !== current);
        closedSet.push(current);

        let neighbours = current.neighbours;
        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (!closedSet.includes(neighbour) && !neighbour.isWall) {
                let newPath = false;
                if (openSet.includes(neighbour)) {
                    newPath = true;
                } else {
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.previous = current;
                }
            }
        }
        openSet.reverse();
    }


    return { path, visitedNodes, error: "No Path Found!" }
}

function heruistic(a, b) {
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return d;
}

export default DFS;