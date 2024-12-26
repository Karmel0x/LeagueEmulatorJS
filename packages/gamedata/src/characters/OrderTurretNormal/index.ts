
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Outer from '../_Turret_Outer/index';
import OrderTurretNormalBasicAttack from './spells/OrderTurretNormalBasicAttack';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		OrderTurretNormalBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretNormal;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.OrderTurretNormalBasicAttack,
		});
	}
}
