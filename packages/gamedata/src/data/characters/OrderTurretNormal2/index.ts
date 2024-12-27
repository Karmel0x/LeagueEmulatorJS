
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import OrderTurretNormal2BasicAttack from './spells/OrderTurretNormal2BasicAttack';


export default class OrderTurretNormal2 extends _Turret_Inner {

	static spells = {
		[SlotId.a]: OrderTurretNormal2BasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretNormal2;
	}

}
