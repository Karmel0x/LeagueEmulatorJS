
const { Vector2 } = require("three");


module.exports = class _PositionHelper {

	/**
	 * Get the angle as normalized Vector2 from source to target
	 * @param {Vector2 | GameObject} source | source.position
	 * @param {Vector2 | GameObject} target | target.position
	 * @return {Vector2}
	*/
	static anglePosition(source, target) {
		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		var angleV2 = new Vector2(sourcePosition.x, sourcePosition.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();

		return angleV2;
	}

	/**
	 * Get random position in range
	 * @param {Vector2 | GameObject} [source]
	 * @param {number} [length]
	 * @returns {Vector2}
	 */
	static getRandomPositionClamped(source = null, length = 10) {
		var randomPositionClamped = new Vector2().random();
		randomPositionClamped.subScalar(0.5).normalize();
		randomPositionClamped.multiplyScalar(length);

		var sourcePosition = source.position || source;
		if (sourcePosition)
			randomPositionClamped.add(sourcePosition);

		return randomPositionClamped;
	}

	/**
	 * Get the nearest point to the end of the array
	 * @param {Vector2} position 
	 * @param {Vector2[]} arrayVector2 
	 * @returns {Vector2}
	 */
	static getFromNearestToEnd(source, arrayVector2) {
		var sourcePosition = source.position || source;
		var nearest = 0;
		arrayVector2.reduce((previousValue, currentValue, index) => {
			let dist = sourcePosition.distanceTo(currentValue);
			if (dist < previousValue) {
				nearest = index;
				return dist;
			}
			return previousValue;
		}, 25000);
		return arrayVector2.slice(nearest);
	}

	constructor(gameObject) {
		this.gameObject = gameObject;
	}
	anglePosition(target) {
		return this.constructor.anglePosition(this.gameObject, target);
	}
	getRandomPositionClamped(length = 10) {
		return this.constructor.getRandomPositionClamped(this.gameObject, length);
	}
	getFromNearestToEnd(arrayVector2) {
		return this.constructor.getFromNearestToEnd(this.gameObject, arrayVector2);
	}
};
