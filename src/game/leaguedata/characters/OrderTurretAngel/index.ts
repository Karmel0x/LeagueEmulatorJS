
import slotId from '../../../../constants/slotId';
import _Turret_Nexus from '../_Turret_Nexus/index';
import OrderTurretAngelBasicAttack from './spells/OrderTurretAngelBasicAttack';


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
