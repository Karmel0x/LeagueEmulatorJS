
import slotId from '../../../../constants/slotId';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import OrderTurretDragonBasicAttack from './spells/OrderTurretDragonBasicAttack';


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
