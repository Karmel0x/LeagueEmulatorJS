import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Minion_Basic from '../_Minion_Basic/index';
import BasicAttack from './spells/Blue_Minion_BasicBasicAttack';
import BasicAttack2 from './spells/Blue_Minion_BasicBasicAttack2';
import CritAttack from './spells/Blue_Minion_BasicCritAttack';


export default class Blue_Minion_Basic extends _Minion_Basic {

	static spells = {
		[SlotId.a]: BasicAttack,
		[SlotId.ea1]: BasicAttack2,
		[SlotId.c]: CritAttack,
	};

}
