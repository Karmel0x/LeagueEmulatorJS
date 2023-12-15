import _Minion_MechMelee from '../_Minion_MechMelee/index.js';
import BasicAttack from './spells/Blue_Minion_MechMeleeBasicAttack.js';
import BasicAttack2 from './spells/Blue_Minion_MechMeleeBasicAttack2.js';
import CritAttack from './spells/Blue_Minion_MechMeleeCritAttack.js';


export default class Blue_Minion_MechMelee extends _Minion_MechMelee {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
