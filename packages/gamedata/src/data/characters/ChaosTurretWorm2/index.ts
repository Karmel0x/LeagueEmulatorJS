
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import ChaosTurretWorm2BasicAttack from './spells/ChaosTurretWorm2BasicAttack';


export default class ChaosTurretWorm2 extends _Turret_Inner {

	static spells = {
		[SlotId.a]: ChaosTurretWorm2BasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretWorm2;
	}

}
