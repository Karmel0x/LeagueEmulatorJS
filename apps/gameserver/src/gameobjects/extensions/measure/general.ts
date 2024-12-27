
import { Vector2, type Vector2Like } from '@repo/geometry';
import Server from '../../../app/server';
import GameObject from '../../game-object';

export default class MeasureGeneral {

	/**
	 * Get the angle as normalized Vector2 from source to target
	*/
	static anglePosition(source: Vector2 | GameObject, target: Vector2 | GameObject) {
		const sourcePosition = (source as GameObject).position || source;
		const targetPosition = (target as GameObject).position || target;
		const angleV2 = new Vector2(sourcePosition.x, sourcePosition.y);
		angleV2.sub(targetPosition);
		angleV2.normalize();

		return angleV2;
	}

	static randomNumber(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	static randomPosition(radius: number = 10) {
		const randomPosition = new Vector2().random();
		randomPosition.subScalar(0.5).normalize();
		randomPosition.multiplyScalar(radius);

		return randomPosition;
	}

	/**
	 * Get random position in range
	 */
	static getRandomPositionClamped(source: Vector2 | GameObject | undefined = undefined, length: number = 10) {
		const randomPositionClamped = this.randomPosition(length);

		const sourcePosition = (source as GameObject)?.position || source;
		if (sourcePosition)
			randomPositionClamped.add(sourcePosition);

		return randomPositionClamped;
	}

	/**
	 * Get the nearest point to the end of the array
	 */
	static getFromNearestToEnd(source: Vector2 | GameObject, list: Vector2[]) {
		const sourcePosition = (source as GameObject).position || source;
		let nearest = 0;
		list.reduce((previousValue, currentValue, index) => {
			const dist = sourcePosition.distanceTo(currentValue);
			if (dist < previousValue) {
				nearest = index;
				return dist;
			}
			return previousValue;
		}, Server.map.diagonal);
		return list.slice(nearest);
	}

	static getPointsAround(object: GameObject, startAngle = -180, maxAngle = 360, angleStep = 15) {
		const objectPosition = object.position;
		const collisionRadius = object.collisionRadius;

		const rotationPoint = objectPosition.clone();
		rotationPoint.add(object.direction.clone().multiplyScalar(collisionRadius * 2));

		const points: Vector2[] = [];

		for (let angle = startAngle; angle < startAngle + maxAngle; angle += angleStep) {
			const point = rotationPoint.clone();
			point.rotateAround(objectPosition, angle * Math.PI / 180);
			points.push(point);
		}

		return points;
	}

	static sortByDistance(points: Vector2[], to: Vector2) {
		points.sort((a, b) => to.distanceTo(a) - to.distanceTo(b));
	}

	static getLinePoints(a: Vector2Like, b: Vector2Like) {
		const points: Vector2Like[] = [];

		const dx = b.x - a.x;
		const dy = b.y - a.y;
		const steps = Math.max(Math.abs(dx), Math.abs(dy));
		const xInc = dx / steps;
		const yInc = dy / steps;

		let x = a.x;
		let y = a.y;

		for (let i = 0; i < steps; i++) {
			points.push({
				x: Math.round(x),
				y: Math.round(y),
			});
			x += xInc;
			y += yInc;
		}

		points.push({
			x: Math.round(b.x),
			y: Math.round(b.y),
		});

		return points;
	}

}
