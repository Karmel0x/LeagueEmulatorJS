
import PositionHelper from '../extensions/Measure/index';
import Dummytarget from './Dummytarget';
import Missile from './Missile';

import { Vector2 } from 'three';
import Unit from '../units/Unit';
import { AttackableUnit, SkillshotOptions } from '../GameObjects';

export default class Skillshot extends Missile {

	/**
	 * @todo
	 */
	static create(spawner: AttackableUnit, targetPosition: Vector2, options: object = {}) {
		const missile = new Skillshot({ spawner, options });
		missile.callbacks.collision._.options.range = options.radius;

		missile.target = new Dummytarget({
			// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
			position: PositionHelper.getPositionBetweenRange(spawner.position, targetPosition, options.range - (options.radius / 2))
		});

		return missile;
	}

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
