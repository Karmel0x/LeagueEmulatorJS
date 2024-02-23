
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Outer from '../_Turret_Outer/index';
import OrderTurretNormalBasicAttack from './spells/OrderTurretNormalBasicAttack';


export default class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		OrderTurretNormalBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.OrderTurretNormalBasicAttack,
		});
	}
}
