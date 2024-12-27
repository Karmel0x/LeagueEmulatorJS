
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import ChaosTurretGiantBasicAttack from './spells/ChaosTurretGiantBasicAttack';


export default class ChaosTurretGiant extends _Turret_Inhibitor {

	static spells = {
		[SlotId.a]: ChaosTurretGiantBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretGiant;
	}

}
