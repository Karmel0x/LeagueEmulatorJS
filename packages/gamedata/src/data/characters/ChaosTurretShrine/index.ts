
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import ChaosTurretShrineBasicAttack from './spells/ChaosTurretShrineBasicAttack';


export default class ChaosTurretShrine extends _Turret_Fountain {

	static spells = {
		[SlotId.a]: ChaosTurretShrineBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretShrine;
	}

}
