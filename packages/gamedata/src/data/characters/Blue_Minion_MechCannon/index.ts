import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Minion_MechCannon from '../_Minion_MechCannon/index';
import BasicAttack from './spells/Blue_Minion_MechCannonBasicAttack';
import BasicAttack2 from './spells/Blue_Minion_MechCannonBasicAttack2';
import CritAttack from './spells/Blue_Minion_MechCannonCritAttack';


export default class Blue_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		[SlotId.a]: BasicAttack,
		[SlotId.ea1]: BasicAttack2,
		[SlotId.c]: CritAttack,
	};

}
