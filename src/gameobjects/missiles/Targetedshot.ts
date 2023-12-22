
import { Vector2 } from 'three';
import Missile from './Missile';

import Unit from '../units/Unit';
import { DefendableUnit, TargetedshotOptions } from '../GameObjects';

export default class Targetedshot extends Missile {

	constructor(options: TargetedshotOptions) {
		super(options);

	}

	/**
	 * @override
	 */
	reachedDest(target: DefendableUnit) {
		console.log('Targetedshot.reachedDest');
		this.owner.combat.attack(target);
		this.destructor();
	}

	doFire() {
		this.fire(this.target, this.options.windupPercent ?? 0);
	}
}
