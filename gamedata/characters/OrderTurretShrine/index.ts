
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import OrderTurretShrineBasicAttack from './spells/OrderTurretShrineBasicAttack';


export default class OrderTurretShrine extends _Turret_Fountain {

	static spells = {
		OrderTurretShrineBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.OrderTurretShrineBasicAttack,
		});
	}
}
