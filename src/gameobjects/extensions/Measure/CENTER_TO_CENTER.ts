
import { Vector2 } from 'three';
import _PositionHelper from './_PositionHelper';

import GameObject from '../../GameObject';

export default class PositionHelper__CENTER_TO_CENTER extends _PositionHelper {

	/**
	 * Get the sum of range and collisionRadius if we should use EDGE instead of CENTER
	 */
	static getRangeSum(source: GameObject, target: GameObject, range = 0) {
		return range;
	}

	/**
	 * Get the distance between source and target
	 * use distanceTo on Vector2 if possible
	*/
	static distanceBetween(source: Vector2 | GameObject, target: Vector2 | GameObject): Vector2 {
		let sourcePosition = source.position || source;
		let targetPosition = target.position || target;
		//sourcePosition = new Vector2(sourcePosition.x, sourcePosition.y);
		//targetPosition = new Vector2(targetPosition.x, targetPosition.y);
		return sourcePosition.distanceTo(targetPosition);
	}

	static sortByDistance(source: Vector2 | GameObject, targets: GameObject[]) {
		let sourcePosition = source.position || source;
		targets.sort((a, b) => {
			return (sourcePosition.distanceTo(a.position) - this.getRangeSum(source, a))
				- (sourcePosition.distanceTo(b.position) - this.getRangeSum(source, b));
		});
	}

	static getNearest(source: Vector2 | GameObject, targets: GameObject[]) {
		this.sortByDistance(source, targets);
		return targets[0] || null;
	}

	static isInRangeFlat(source: Vector2 | GameObject, target: GameObject, range = 0) {
		let sourcePosition = source.position || source;
		let targetPosition = target.position || target;
		return sourcePosition.distanceTo(targetPosition) <= range;
	}

	static isInRange(source: Vector2 | GameObject, target: GameObject, range = 0) {
		return this.isInRangeFlat(source, target, this.getRangeSum(source, target, range));
	}

	static filterByRange(source: Vector2 | GameObject, targets: GameObject[], range: number) {
		let sourcePosition = source.position || source;
		return targets.filter(target => this.isInRange(sourcePosition, target, range));
	}

	static getPositionBetweenRange(source: Vector2 | GameObject, target: Vector2 | GameObject, range: number | { minimum: number; maximum: number; }) {

		let sourcePosition = source.position || source;
		let targetPosition = target.position || target;
		let positionBetweenRange = new Vector2(targetPosition.x, targetPosition.y);
		positionBetweenRange.sub(sourcePosition);
		if (positionBetweenRange.length() == 0)
			positionBetweenRange.x = 0.001;

		let rangeMinimum = this.getRangeSum(source, target, range.minimum || range);
		let rangeMaximum = this.getRangeSum(source, target, range.maximum || range);
		positionBetweenRange.clampLength(rangeMinimum, rangeMaximum);
		positionBetweenRange.add(sourcePosition);

		return positionBetweenRange;
	}

	/**
	 * may be used, for example, to move a unit to distance where it can attack a target
	 */
	static getPositionToTargetMinusRange(source: Vector2 | GameObject, target: Vector2 | GameObject, range = 0) {
		let sourcePosition = source.position || source;
		let targetPosition = target.position || target;
		let positionToTargetMinusRange = new Vector2(sourcePosition.x, sourcePosition.y);
		positionToTargetMinusRange.sub(targetPosition);
		positionToTargetMinusRange.clampLength(0, range);
		positionToTargetMinusRange.add(targetPosition);

		return positionToTargetMinusRange;
	}

	// ===================

	getRangeSum(target, range = 0) {
		return this.constructor.getRangeSum(this.gameObject, target, range);
	}
	distanceBetween(target) {
		return this.constructor.distanceBetween(this.gameObject, target);
	}
	sortByDistance(targets) {
		return this.constructor.sortByDistance(this.gameObject, targets);
	}
	getNearest(objects) {
		return this.constructor.getNearest(this.gameObject, objects);
	}
	isInRangeFlat(target, range) {
		return this.constructor.isInRangeFlat(this.gameObject, target, range);
	}
	isInRange(target, range) {
		return this.constructor.isInRange(this.gameObject, target, range);
	}
	filterByRange(targets, range) {
		return this.constructor.filterByRange(this.gameObject, targets, range);
	}
	getPositionBetweenRange(target, range) {
		return this.constructor.getPositionBetweenRange(this.gameObject, target, range);
	}
	getPositionToTargetMinusRange(target, range) {
		return this.constructor.getPositionToTargetMinusRange(this.gameObject, target, range);
	}

}
