
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Outer from '../_Turret_Outer/index';
import ChaosTurretWormBasicAttack from './spells/ChaosTurretWormBasicAttack';


export default class ChaosTurretWorm extends _Turret_Outer {

	static spells = {
		[SlotId.a]: ChaosTurretWormBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretWorm;
	}

}
