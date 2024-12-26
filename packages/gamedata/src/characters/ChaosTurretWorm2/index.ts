
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import ChaosTurretWorm2BasicAttack from './spells/ChaosTurretWorm2BasicAttack';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class ChaosTurretWorm2 extends _Turret_Inner {

	static spells = {
		ChaosTurretWorm2BasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretWorm2;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.ChaosTurretWorm2BasicAttack,
		});
	}
}
