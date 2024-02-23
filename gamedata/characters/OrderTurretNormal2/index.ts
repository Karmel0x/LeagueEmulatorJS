
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import OrderTurretNormal2BasicAttack from './spells/OrderTurretNormal2BasicAttack';


export default class OrderTurretNormal2 extends _Turret_Inner {

	static spells = {
		OrderTurretNormal2BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.OrderTurretNormal2BasicAttack,
		});
	}
}
