const { Vector2 } = require("three");

module.exports = class PositionHelper {
	/**
	 * Get position not farther than range and not closer than minRange
	 * @param {Vector2} SourcePosition
	 * @param {Vector2} targetPosition
	 * @param {Number} range
	 * @param {Number} minRange
	 * @returns {Vector2}
	 */
	static _getPositionBetweenRange(sourcePosition, targetPosition, range = 0, minRange = 0){

		var positionBetweenRange = new Vector2(targetPosition.x, targetPosition.y);
		positionBetweenRange.sub(sourcePosition);
		if(positionBetweenRange.length() == 0)
			positionBetweenRange.x = 0.001;
		positionBetweenRange.clampLength(minRange ?? range, range);
		positionBetweenRange.add(sourcePosition);

		return positionBetweenRange;
	}
	/**
	 * 
	 * @param {Vector2|GameObject} source or source.position
	 * @param {Vector2|GameObject} target or target.position
	 * @param {Number} range 
	 * @param {Number} minRange
	 * @returns {Vector2}
	 */
	static getPositionBetweenRange(source, target, range = 0, minRange = 0){
		return this._getPositionBetweenRange(source.position || source, target.position || target, range, minRange);
	}

	/**
	 * 
	 * @param {Vector2|GameObject} source or source.position
	 * @param {Vector2|GameObject} target or target.position
	 * @param {Number} range 
	 * @returns {Vector2}
	 */
	static getMaxRangePosition(source, target, range = 0){
		return this._getPositionBetweenRange(source.position || source, target.position || target, range, range);
	}
	
	/**
	 * Get the angle as normalized Vector2 from position to targetPosition
	 * @param {Vector2} position
	 * @param {Vector2} targetPosition
	 * @return {Vector2}
	*/
	static _anglePosition(position, targetPosition){
		var angleV2 = new Vector2(position.x, position.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();
		//angleV2.add(owner.position);
		return angleV2;
	}
	/**
	 * Get the angle as normalized Vector2 from source to target
	 * @param {Vector2|GameObject} source or source.position
	 * @param {Vector2|GameObject} target or target.position
	 * @return {Vector2}
	*/
	static anglePosition(source, target){
		return this._anglePosition(source.position || source, target.position || target);
	}

	/**
	 * Get the angle as normalized Vector2 from source to target
	 * @param {Vector2|GameObject} source or source.position
	 * @param {Vector2|GameObject} target or target.position
	 * @return {Vector2}
	*/
	static _distanceBetween(sourcePosition, targetPosition){
		sourcePosition = new Vector2(sourcePosition.x, sourcePosition.y);
		targetPosition = new Vector2(targetPosition.x, targetPosition.y);
		return sourcePosition.distanceTo(targetPosition);
	}
	/**
	 * Get the angle as normalized Vector2 from source to target
	 * @param {Vector2|GameObject} source or source.position
	 * @param {Vector2|GameObject} target or target.position
	 * @return {Vector2}
	*/
	static distanceBetween(source, target){
		return this._distanceBetween(source.position || source, target.position || target);
	}
	
	/**
	 * Get random position in range
	 * @param {Number} length 
	 * @returns {Vector2}
	 */
	static getRandomPositionClamped(length = 10){
		var RandomPositionClamped = new Vector2().random();
		RandomPositionClamped.subScalar(0.5).normalize();
		RandomPositionClamped.multiplyScalar(length);

		return RandomPositionClamped;
	}

	static _getPositionToTargetMinusRange(sourcePosition, targetPosition, range = 0){
		var positionToTargetMinusRange = new Vector2(sourcePosition.x, sourcePosition.y);
		positionToTargetMinusRange.sub(targetPosition);
		positionToTargetMinusRange.clampLength(0, range);
		positionToTargetMinusRange.add(targetPosition);

		return positionToTargetMinusRange;
	}

	static getPositionToTargetMinusRange(source, target, range = 0){
		return this._getPositionToTargetMinusRange(source.position || source, target.position || target, range);
	}
};
