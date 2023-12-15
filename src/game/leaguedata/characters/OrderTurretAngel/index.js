
import slotId from '../../../../constants/slotId.js';
import _Turret_Nexus from '../_Turret_Nexus/index.js';
import OrderTurretAngelBasicAttack from './spells/OrderTurretAngelBasicAttack.js';


export default class OrderTurretAngel extends _Turret_Nexus {

	static spells = {
		OrderTurretAngelBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.OrderTurretAngelBasicAttack,
		});
	}
}
