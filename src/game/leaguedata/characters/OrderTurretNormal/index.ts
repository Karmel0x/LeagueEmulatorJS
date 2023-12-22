
import slotId from '../../../../constants/slotId';
import _Turret_Outer from '../_Turret_Outer/index';
import OrderTurretNormalBasicAttack from './spells/OrderTurretNormalBasicAttack';


export default class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		OrderTurretNormalBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretNormalBasicAttack,
		});
	}
}
