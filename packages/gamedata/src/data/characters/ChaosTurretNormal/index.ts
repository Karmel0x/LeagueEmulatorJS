
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Nexus from '../_Turret_Nexus/index';
import ChaosTurretNormalBasicAttack from './spells/ChaosTurretNormalBasicAttack';


export default class ChaosTurretNormal extends _Turret_Nexus {

	static spells = {
		[SlotId.a]: ChaosTurretNormalBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretNormal;
	}

}
