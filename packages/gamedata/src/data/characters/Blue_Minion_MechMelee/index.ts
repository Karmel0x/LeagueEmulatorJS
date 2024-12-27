import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Minion_MechMelee from '../_Minion_MechMelee/index';
import BasicAttack from './spells/Blue_Minion_MechMeleeBasicAttack';
import BasicAttack2 from './spells/Blue_Minion_MechMeleeBasicAttack2';
import CritAttack from './spells/Blue_Minion_MechMeleeCritAttack';


export default class Blue_Minion_MechMelee extends _Minion_MechMelee {

	static spells = {
		[SlotId.a]: BasicAttack,
		[SlotId.ea1]: BasicAttack2,
		[SlotId.c]: CritAttack,
	};

}
