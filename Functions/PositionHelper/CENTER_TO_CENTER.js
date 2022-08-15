
const { Vector2 } = require("three");
const _PositionHelper = require("./_PositionHelper");


class PositionHelper__CENTER_TO_CENTER extends _PositionHelper {

	/**
	 * Get the sum of range and collisionRadius if we should use EDGE instead of CENTER
	 * @param {GameObject} source
	 * @param {GameObject} target
	 * @param {Number} range
	 * @returns {Number}
	 */
	static getRangeSum(source, target, range = 0){
		return range;
	}

	/**
	 * Get the distance between source and target
	 * use distanceTo on Vector2 if possible
	 * @param {(Vector2|GameObject)} source or source.position
	 * @param {(Vector2|GameObject)} target or target.position
	 * @return {Vector2}
	*/
	static distanceBetween(source, target){
		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		//sourcePosition = new Vector2(sourcePosition.x, sourcePosition.y);
		//targetPosition = new Vector2(targetPosition.x, targetPosition.y);
		return sourcePosition.distanceTo(targetPosition);
	}

	/**
	 * @param {GameObject|Vector2} source
	 * @param {Array.<GameObject>} targets
	 */
	static sortByDistance(source, targets){
		var sourcePosition = source.position || source;
		targets.sort((a, b) => {
			return (sourcePosition.distanceTo(a) - this.getRangeSum(source, a))
				- (sourcePosition.distanceTo(b) - this.getRangeSum(source, b));
		});
	}

	/**
	 * @param {GameObject|Vector2} source 
	 * @param {Array.<GameObject>} targets 
	 * @returns {GameObject}
	 */
	static getNearest(source, targets){
		this.sortByDistance(source, targets);
		return units[0] || null;
	}

	/**
	 * @param {GameObject|Vector2} source
	 * @param {GameObject} target
	 */
	static isInRange(source, target, range){
		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		return sourcePosition.distanceTo(targetPosition) <= this.getRangeSum(source, target, range);
	}

	/**
	 * @param {GameObject|Vector2} source 
	 * @param {Array.<GameObject>} targets 
	 * @param {Number} range 
	 * @returns {Array.<GameObject>}
	 */
	static filterByRange(source, targets, range){
		return targets.filter(target => this.isInRange(source, target, range));
	}

	/**
	 * @param {(Vector2|GameObject)} source or source.position
	 * @param {(Vector2|GameObject)} target or target.position
	 * @param {Number|Object} range or {minimum, maximum}
	 * @returns {Vector2}
	 */
	static getPositionBetweenRange(source, target, range){

		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		var positionBetweenRange = new Vector2(targetPosition.x, targetPosition.y);
		positionBetweenRange.sub(sourcePosition);
		if(positionBetweenRange.length() == 0)
			positionBetweenRange.x = 0.001;

		var rangeMinimum = this.getRangeSum(source, target, range.minimum || range);
		var rangeMaximum = this.getRangeSum(source, target, range.maximum || range);
		positionBetweenRange.clampLength(rangeMinimum, rangeMaximum);
		positionBetweenRange.add(sourcePosition);

		return positionBetweenRange;
	}

	/**
	 * may be used, for example, to move a unit to distance where it can attack a target
	 * @param {(Vector2|GameObject)} source or source.position
	 * @param {(Vector2|GameObject)} target or target.position
	 * @param {Number} range
	 * @returns 
	 */
	static getPositionToTargetMinusRange(source, target, range = 0){
		var sourcePosition = source.position || source;
		var targetPosition = target.position || target;
		var positionToTargetMinusRange = new Vector2(sourcePosition.x, sourcePosition.y);
		positionToTargetMinusRange.sub(targetPosition);
		positionToTargetMinusRange.clampLength(0, range);
		positionToTargetMinusRange.add(targetPosition);

		return positionToTargetMinusRange;
	}

	// ===================

	getRangeSum(target, range = 0){
		this.constructor.getRangeSum(this.gameObject, target, range);
	}
	distanceBetween(target){
		this.constructor.distanceBetween(this.gameObject, target);
	}
	sortByDistance(targets){
		this.constructor.sortByDistance(this.gameObject, targets);
	}
	getNearest(objects){
		return this.constructor.getNearest(this.gameObject, objects);
	}
	isInRange(target, range){
		return this.constructor.isInRange(this.gameObject, target, range);
	}
	filterByRange(targets, range){
		return this.constructor.filterByRange(this.gameObject, targets, range);
	}
	getPositionBetweenRange(target, range){
		return this.constructor.getPositionBetweenRange(this.gameObject, target, range);
	}
	getPositionToTargetMinusRange(target, range){
		return this.constructor.getPositionToTargetMinusRange(this.gameObject, target, range);
	}

}

module.exports = PositionHelper__CENTER_TO_CENTER;
