# Pathfinding Visualizer

https://fa74x.github.io/Pathfinding-Visualizer/

## Welcome to my Pathfinding Visualizer!
Pathfinding algorithms are a method of finding a route between two points, usually in a digital space. They have a wide range of applications, from video games to navigation systems. I find them fascinating because of the way they can find the most efficient route between two points, and I wanted to create a tool that would allow people to see these algorithms in action.

This application includes four different pathfinding algorithms: A*, Dijkstra's, Breadth-First Search, and Depth-First Search. Each algorithm has its own strengths and weaknesses, so you can experiment with each one to see which works best for your particular needs. I hope you enjoy playing around with this tool and that it helps you to better understand pathfinding algorithms.

## Available Algorithms

### BFS
Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root (top) node of a tree and explores the neighbor nodes first, before moving to the next level neighbors.

Start at the root node and add it to the queue.
while the queue is not empty:
remove the first node from the queue.
if the removed node has not been visited:
mark it as visited.
add all of its unvisited neighbors to the queue.

The time complexity of BFS is O(n + m), where n is the number of vertices and m is the number of edges.

### DFS
Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. One starts at the root (selecting some node as the root in the graph case) and explores as far as possible along each branch before backtracking.

Start by putting any one of the graph's vertices on top of a stack.
Pop the top item of the stack. This gives us the vertex to be visited next.
Mark the popped vertex as visited.
Push all the unvisited neighbors of the popped vertex onto the stack.
If the stack is empty, we have finished traversing the graph. If not, repeat from Step 2.

The time complexity of DFS is O(n + m), where n is the number of vertices and m is the number of edges.
