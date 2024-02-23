
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Nexus from '../_Turret_Nexus/index';
import OrderTurretAngelBasicAttack from './spells/OrderTurretAngelBasicAttack';


export default class OrderTurretAngel extends _Turret_Nexus {

	static spells = {
		OrderTurretAngelBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.OrderTurretAngelBasicAttack,
		});
	}
}
