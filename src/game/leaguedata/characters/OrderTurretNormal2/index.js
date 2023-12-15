
import slotId from '../../../../constants/slotId.js';
import _Turret_Inner from '../_Turret_Inner/index.js';
import OrderTurretNormal2BasicAttack from './spells/OrderTurretNormal2BasicAttack.js';


export default class OrderTurretNormal2 extends _Turret_Inner {

	static spells = {
		OrderTurretNormal2BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretNormal2BasicAttack,
		});
	}
}
