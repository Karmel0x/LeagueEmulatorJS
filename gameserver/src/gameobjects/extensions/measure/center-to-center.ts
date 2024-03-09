
import { Vector2 } from 'three';
import type GameObject from '../../game-object';

export default class MeasureCenterToCenter {

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
	static distanceBetween(source: Vector2 | GameObject, target: Vector2 | GameObject) {
		let sourcePosition = (source as GameObject).position || source;
		let targetPosition = (target as GameObject).position || target;
		//sourcePosition = new Vector2(sourcePosition.x, sourcePosition.y);
		//targetPosition = new Vector2(targetPosition.x, targetPosition.y);
		return sourcePosition.distanceTo(targetPosition);
	}

	static sortByDistance(source: Vector2 | GameObject, targets: GameObject[]) {
		let sourcePosition = (source as GameObject).position || source;
		targets.sort((a, b) => {
			return (sourcePosition.distanceTo(a.position) - this.getRangeSum(source as GameObject, a))
				- (sourcePosition.distanceTo(b.position) - this.getRangeSum(source as GameObject, b));
		});
	}

	static getNearest<T extends GameObject>(source: Vector2 | GameObject, targets: T[]) {
		this.sortByDistance(source, targets);
		return targets[0] || undefined;
	}

	static isInRangeFlat(source: Vector2 | GameObject, target: GameObject, range = 0) {
		let sourcePosition = (source as GameObject).position || source;
		let targetPosition = (target as GameObject).position || target;
		return sourcePosition.distanceTo(targetPosition) <= range;
	}

	static isInRange(source: Vector2 | GameObject, target: GameObject, range = 0) {
		return this.isInRangeFlat(source, target, this.getRangeSum((source as GameObject), target, range));
	}

	static filterByRange<T extends GameObject>(source: Vector2 | GameObject, targets: T[], range: number) {
		return targets.filter(target => this.isInRange(source, target, range));
	}

	static getPositionBetweenRange(source: Vector2 | GameObject, target: Vector2 | GameObject, range: number | { minimum: number; maximum: number; }) {

		let sourcePosition = (source as GameObject).position || source;
		let targetPosition = (target as GameObject).position || target;
		let positionBetweenRange = new Vector2(targetPosition.x, targetPosition.y);
		positionBetweenRange.sub(sourcePosition);
		if (positionBetweenRange.length() == 0)
			positionBetweenRange.x = 0.001;

		if (typeof range === 'number')
			range = { minimum: range, maximum: range };

		let rangeMinimum = this.getRangeSum((source as GameObject), target as GameObject, range.minimum);
		let rangeMaximum = range.minimum == range.maximum ? rangeMinimum : this.getRangeSum((source as GameObject), target as GameObject, range.maximum);
		positionBetweenRange.clampLength(rangeMinimum, rangeMaximum);
		positionBetweenRange.add(sourcePosition);

		return positionBetweenRange;
	}

	/**
	 * may be used, for example, to move a unit to distance where it can attack a target
	 */
	static getPositionToTargetMinusRange(source: Vector2 | GameObject, target: Vector2 | GameObject, range = 0) {
		let sourcePosition = (source as GameObject).position || source;
		let targetPosition = (target as GameObject).position || target;
		let positionToTargetMinusRange = new Vector2(sourcePosition.x, sourcePosition.y);
		positionToTargetMinusRange.sub(targetPosition);
		positionToTargetMinusRange.clampLength(0, range);
		positionToTargetMinusRange.add(targetPosition);

		return positionToTargetMinusRange;
	}

}
