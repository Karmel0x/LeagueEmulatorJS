
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import OrderTurretShrineBasicAttack from './spells/OrderTurretShrineBasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class OrderTurretShrine extends _Turret_Fountain {

	static spells = {
		OrderTurretShrineBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretShrine;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.OrderTurretShrineBasicAttack,
		});
	}
}
