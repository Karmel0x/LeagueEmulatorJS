
import slotId from '../../../../constants/slotId.js';
import _Turret_Fountain from '../_Turret_Fountain/index.js';
import OrderTurretShrineBasicAttack from './spells/OrderTurretShrineBasicAttack.js';


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
