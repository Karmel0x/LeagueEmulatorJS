
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import OrderTurretDragonBasicAttack from './spells/OrderTurretDragonBasicAttack';


export default class OrderTurretDragon extends _Turret_Inhibitor {

	static spells = {
		OrderTurretDragonBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.OrderTurretDragonBasicAttack,
		});
	}
}
