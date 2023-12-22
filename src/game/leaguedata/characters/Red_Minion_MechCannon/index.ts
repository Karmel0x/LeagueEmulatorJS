import _Minion_MechCannon from '../_Minion_MechCannon/index';
import BasicAttack from './spells/Red_Minion_MechCannonBasicAttack';
import BasicAttack2 from './spells/Red_Minion_MechCannonBasicAttack2';
import CritAttack from './spells/Red_Minion_MechCannonCritAttack';


export default class Red_Minion_MechCannon extends _Minion_MechCannon {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
