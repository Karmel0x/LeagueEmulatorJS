import _Minion_MechCannon from '../_Minion_MechCannon/index.js';
import BasicAttack from './spells/Red_Minion_MechCannonBasicAttack.js';
import BasicAttack2 from './spells/Red_Minion_MechCannonBasicAttack2.js';
import CritAttack from './spells/Red_Minion_MechCannonCritAttack.js';


export default class Red_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
