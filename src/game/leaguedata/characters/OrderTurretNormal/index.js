
import slotId from '../../../../constants/slotId.js';
import _Turret_Outer from '../_Turret_Outer/index.js';
import OrderTurretNormalBasicAttack from './spells/OrderTurretNormalBasicAttack.js';


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
