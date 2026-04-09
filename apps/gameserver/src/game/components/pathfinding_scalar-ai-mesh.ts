import type { Vector2Like } from '@repo/geometry';

export default class Pathfinding_ScalarAIMesh {

	static coordinatesMinX = -328.903;
	static coordinatesMaxX = 14311.7715;
	static coordinatesMinY = -110.1923;
	static coordinatesMaxY = 14556.878;

	static aimeshMinX = 0;
	static aimeshMaxX = 293;
	static aimeshMinY = 0;
	static aimeshMaxY = 294;

	static toAIMeshX(x: number) {
		const aX = ((x - this.coordinatesMinX) / (this.coordinatesMaxX - this.coordinatesMinX) * (this.aimeshMaxX - this.aimeshMinX) + this.aimeshMinX);
		const mX = Math.min(Math.max(aX, this.aimeshMinX), this.aimeshMaxX);
		return mX;
	}

	static toAIMeshY(y: number) {
		const aY = ((y - this.coordinatesMinY) / (this.coordinatesMaxY - this.coordinatesMinY) * (this.aimeshMaxY - this.aimeshMinY) + this.aimeshMinY);
		const mY = Math.min(Math.max(aY, this.aimeshMinY), this.aimeshMaxY);
		return mY;
	}

	static toAIMesh({ x, y }: Vector2Like) {
		return {
			x: Math.round(this.toAIMeshX(x)),
			y: Math.round(this.toAIMeshY(y)),
		};
	}

	static toCoordinatesX(x: number) {
		return ((x - this.aimeshMinX) / (this.aimeshMaxX - this.aimeshMinX) * (this.coordinatesMaxX - this.coordinatesMinX) + this.coordinatesMinX);
	}

	static toCoordinatesY(y: number) {
		return ((y - this.aimeshMinY) / (this.aimeshMaxY - this.aimeshMinY) * (this.coordinatesMaxY - this.coordinatesMinY) + this.coordinatesMinY);
	}

	static toCoordinates({ x, y }: Vector2Like) {
		return {
			x: Math.round(this.toCoordinatesX(x)),
			y: Math.round(this.toCoordinatesY(y)),
		};
	}

}
