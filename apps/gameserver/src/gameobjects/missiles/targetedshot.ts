
import { Vector2 } from 'three';
import Missile, { GameTarget, MissileOptions } from './missile';
import { IDefendable } from '../extensions/combat/defendable';

export type TargetedshotOptions = MissileOptions & {

};

export default class Targetedshot extends Missile {
	static initialize(options: TargetedshotOptions) {
		return super.initialize(options) as Targetedshot;
	}

	declare options: TargetedshotOptions;
	//declare target: GameTarget;

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
	}

	doFire() {
		this.fire(this.target, this.options.windupPercent ?? 0);
	}
}
