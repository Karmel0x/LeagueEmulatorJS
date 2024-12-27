
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import OrderTurretDragonBasicAttack from './spells/OrderTurretDragonBasicAttack';


export default class OrderTurretDragon extends _Turret_Inhibitor {

	static spells = {
		[SlotId.a]: OrderTurretDragonBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretDragon;
	}

}
