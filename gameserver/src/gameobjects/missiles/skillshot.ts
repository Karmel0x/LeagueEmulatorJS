
import Dummytarget from './dummytarget';
import Missile, { GameTarget, MissileOptions } from './missile';
import * as Measure from '../extensions/measure';
import { Vector2 } from 'three';


export type SkillshotOptions = MissileOptions & {
	targetPosition: Vector2;
};

export default class Skillshot extends Missile {

	static create(options: Omit<SkillshotOptions, 'target'>) {
		let range = options.stats.range || options.stats.attackRange || 1;
		let radius = options.stats.radius || options.stats.collisionRadius || 1;

		let target = new Dummytarget({
			// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
			position: Measure.centerToCenter.getPositionBetweenRange(options.spawner.position, options.targetPosition, range - (radius / 2))
		});
		target.loader();

		const missile = new Skillshot({
			...options,
			target,
		});
		missile.loader();
		missile.callbacks.collision._.options.range = radius;

		return missile;
	}

	declare options: SkillshotOptions;

	callbacks = {
		move: {},
		collision: {
			// defaultly will end on collision
			_: {
				options: {
					range: 10,
				},
				function: (target) => {
					if (this.owner == target)
						return;

					this.owner.combat.attack(target);
					delete this.callbacks.collision._;
					//this.waypoints = [];
					this.destructor();
				}
			}
		},
	};

	constructor(options: SkillshotOptions) {
		super(options);

	}

	doFire() {
		this.fire(this.target);
	}
}
