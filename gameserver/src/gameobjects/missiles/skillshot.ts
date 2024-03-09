
import Dummytarget from './dummytarget';
import Missile, { GameTarget, MissileOptions } from './missile';
import * as Measure from '../extensions/measure';
import { Vector2 } from 'three';


export type SkillshotOptions = MissileOptions & {
	targetPosition: Vector2;
};

export default class Skillshot extends Missile {
	static initialize(options: SkillshotOptions) {
		return super.initialize(options) as Skillshot;
	}

	static create(options: Omit<SkillshotOptions, 'target'>) {
		let range = options.stats.range || options.stats.attackRange || 1;
		let radius = options.stats.radius || options.stats.collisionRadius || 1;

		let target = Dummytarget.initialize({
			// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
			position: Measure.centerToCenter.getPositionBetweenRange(options.spawner.position, options.targetPosition, range - (radius / 2)),
		});

		const missile = Skillshot.initialize({
			...options,
			target,
		});

		return missile;
	}

	declare options: SkillshotOptions;

	constructor(options: SkillshotOptions) {
		super(options);

	}

	doFire() {
		this.fire(this.target);
	}
}
