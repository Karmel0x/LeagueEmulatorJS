import _Minion_Wizard from '../_Minion_Wizard/index';
import BasicAttack from './spells/Blue_Minion_WizardBasicAttack';
import BasicAttack2 from './spells/Blue_Minion_WizardBasicAttack2';
import CritAttack from './spells/Blue_Minion_WizardCritAttack';


export default class Blue_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
