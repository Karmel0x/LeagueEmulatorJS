
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import OrderTurretNormal2BasicAttack from './spells/OrderTurretNormal2BasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class OrderTurretNormal2 extends _Turret_Inner {

	static spells = {
		OrderTurretNormal2BasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretNormal2;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.OrderTurretNormal2BasicAttack,
		});
	}
}
