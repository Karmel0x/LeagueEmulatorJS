
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import OrderTurretShrineBasicAttack from './spells/OrderTurretShrineBasicAttack';


export default class OrderTurretShrine extends _Turret_Fountain {

	static spells = {
		[SlotId.a]: OrderTurretShrineBasicAttack,
	};

	get base() {
		return this.constructor as typeof OrderTurretShrine;
	}

}
