
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Outer from '../_Turret_Outer/index';
import OrderTurretNormalBasicAttack from './spells/OrderTurretNormalBasicAttack';


export default class OrderTurretNormal extends _Turret_Outer {

	static spells = {
		[SlotId.a]: OrderTurretNormalBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretNormal;
	}

}
