
import slotId from '../../../../constants/slotId.js';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index.js';
import OrderTurretDragonBasicAttack from './spells/OrderTurretDragonBasicAttack.js';


export default class OrderTurretDragon extends _Turret_Inhibitor {

	static spells = {
		OrderTurretDragonBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretDragonBasicAttack,
		});
	}
}
