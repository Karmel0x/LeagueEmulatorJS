
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Outer from '../_Turret_Outer/index';
import ChaosTurretWormBasicAttack from './spells/ChaosTurretWormBasicAttack';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class ChaosTurretWorm extends _Turret_Outer {

	static spells = {
		ChaosTurretWormBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretWorm;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.ChaosTurretWormBasicAttack,
		});
	}
}
