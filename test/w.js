const { NavMesh } = require("navmesh");

/*
	Imaging your game world has three walkable rooms, like this:

		+-----+-----+
		|     |     |
		|  1  |  2  |
		|     |     |
		+-----------+
					|     |
					|  3  |
					|     |
					+-----+
*/

// The mesh is represented as an array where each element contains the points for an indivdual
// polygon within the mesh.
const meshPolygonPoints = [
	[{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }], // Polygon 1
	[{ x: 10, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 10 }, { x: 10, y: 10 }], // Polygon 2
	[{ x: 10, y: 10 }, { x: 20, y: 10 }, { x: 20, y: 20 }, { x: 10, y: 20 }] // Polygon 3
];
const navMesh = new NavMesh(meshPolygonPoints);

// Find a path from the top left of room 1 to the bottom left of room 3
const path = navMesh.findPath({ x: 0, y: 0 }, { x: 10, y: 20 });
// ⮡  [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 10, y: 20 }]

console.log(path);

