import _Minion_MechCannon from '../_Minion_MechCannon/index';
import BasicAttack from './spells/Blue_Minion_MechCannonBasicAttack';
import BasicAttack2 from './spells/Blue_Minion_MechCannonBasicAttack2';
import CritAttack from './spells/Blue_Minion_MechCannonCritAttack';


export default class Blue_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
