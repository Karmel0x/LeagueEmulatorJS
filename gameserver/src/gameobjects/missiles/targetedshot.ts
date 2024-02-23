
import { Vector2 } from 'three';
import Missile, { MissileOptions } from './missile';
import { IDefendable } from '../extensions/combat/defendable';

export type TargetedshotOptions = MissileOptions & {

};

export default class Targetedshot extends Missile {

	constructor(options: TargetedshotOptions) {
		super(options);

	}

	/**
	 * @override
	 */
	reachedDest(target: IDefendable) {
		console.log('Targetedshot.reachedDest');
		this.eventEmitter.emit('reachedDest', target);
		this.owner.combat.attack(target);
		this.destructor();
	}

	doFire() {
		this.fire(this.target, this.options.windupPercent ?? 0);
	}
}
