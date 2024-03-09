
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import OrderTurretDragonBasicAttack from './spells/OrderTurretDragonBasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class OrderTurretDragon extends _Turret_Inhibitor {

	static spells = {
		OrderTurretDragonBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretDragon;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.OrderTurretDragonBasicAttack,
		});
	}
}
