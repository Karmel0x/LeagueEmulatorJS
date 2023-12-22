
import slotId from '../../../../constants/slotId';
import _Turret_Fountain from '../_Turret_Fountain/index';
import OrderTurretShrineBasicAttack from './spells/OrderTurretShrineBasicAttack';


export default class OrderTurretShrine extends _Turret_Fountain {

	static spells = {
		OrderTurretShrineBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretShrineBasicAttack,
		});
	}
}
