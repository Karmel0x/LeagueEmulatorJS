
import { Vector2 } from 'three';

import GameObject from '../../GameObject';

export default class _PositionHelper {

	/**
	 * Get the angle as normalized Vector2 from source to target
	*/
	static anglePosition(source: Vector2 | GameObject, target: Vector2 | GameObject) {
		let sourcePosition = source.position || source;
		let targetPosition = target.position || target;
		let angleV2 = new Vector2(sourcePosition.x, sourcePosition.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();

		return angleV2;
	}

	/**
	 * Get random position in range
	 */
	static getRandomPositionClamped(source: Vector2 | GameObject | undefined = undefined, length: number = 10) {
		let randomPositionClamped = new Vector2().random();
		randomPositionClamped.subScalar(0.5).normalize();
		randomPositionClamped.multiplyScalar(length);

		let sourcePosition = source?.position || source;
		if (sourcePosition)
			randomPositionClamped.add(sourcePosition);

		return randomPositionClamped;
	}

	/**
	 * Get the nearest point to the end of the array
	 */
	static getFromNearestToEnd(source: Vector2 | GameObject, arrayVector2: Vector2[]) {
		let sourcePosition = source.position || source;
		let nearest = 0;
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
}
