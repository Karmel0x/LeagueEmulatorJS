
class Pathfinding_ScalarAIMesh {

	static coordinatesMinX = -328.90;
	static coordinatesMaxX = 14311.77;
	static coordinatesMinY = -110.19;
	static coordinatesMaxY = 14556.88;

	static aimeshMinX = 0;
	static aimeshMaxX = 293;
	static aimeshMinY = 0;
	static aimeshMaxY = 294;


	static toAIMesh({ x, y }) {
		return {
			x: Math.round((x - this.coordinatesMinX) / (this.coordinatesMaxX - this.coordinatesMinX) * (this.aimeshMaxX - this.aimeshMinX) + this.aimeshMinX),
			y: Math.round((y - this.coordinatesMinY) / (this.coordinatesMaxY - this.coordinatesMinY) * (this.aimeshMaxY - this.aimeshMinY) + this.aimeshMinY),
		};
	}

	static toCoordinates({ x, y }) {
		return {
			x: Math.round((x - this.aimeshMinX) / (this.aimeshMaxX - this.aimeshMinX) * (this.coordinatesMaxX - this.coordinatesMinX) + this.coordinatesMinX),
			y: Math.round((y - this.aimeshMinY) / (this.aimeshMaxY - this.aimeshMinY) * (this.coordinatesMaxY - this.coordinatesMinY) + this.coordinatesMinY),
		};
	}

}

module.exports = Pathfinding_ScalarAIMesh;
