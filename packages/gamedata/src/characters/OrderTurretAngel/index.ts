
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Nexus from '../_Turret_Nexus/index';
import OrderTurretAngelBasicAttack from './spells/OrderTurretAngelBasicAttack';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class OrderTurretAngel extends _Turret_Nexus {

	static spells = {
		OrderTurretAngelBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretAngel;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.OrderTurretAngelBasicAttack,
		});
	}
}
