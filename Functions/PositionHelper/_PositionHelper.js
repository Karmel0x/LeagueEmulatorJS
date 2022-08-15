const { Vector2 } = require("three");

module.exports = class _PositionHelper {

	/**
	 * Get the angle as normalized Vector2 from source to target
	 * @param {(Vector2|GameObject)} source or source.position
	 * @param {(Vector2|GameObject)} target or target.position
	 * @return {Vector2}
	*/
	static anglePosition(source, target){
		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		var angleV2 = new Vector2(sourcePosition.x, sourcePosition.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();
		
		return angleV2;
	}

	/**
	 * Get random position in range
	 * @param {?(Vector2|GameObject)} source
	 * @param {Number} length
	 * @returns {Vector2}
	 */
	static getRandomPositionClamped(source = null, length = 10){
		var randomPositionClamped = new Vector2().random();
		randomPositionClamped.subScalar(0.5).normalize();
		randomPositionClamped.multiplyScalar(length);

		var sourcePosition = source.position || source;
		if(sourcePosition)
			randomPositionClamped.add(sourcePosition);

		return randomPositionClamped;
	}

	constructor(gameObject){
		this.gameObject = gameObject;
	}
	anglePosition(target){
		return this.constructor.anglePosition(this.gameObject, target);
	}
	getRandomPositionClamped(length = 10){
		return this.constructor.getRandomPositionClamped(this.gameObject, length);
	}
};
