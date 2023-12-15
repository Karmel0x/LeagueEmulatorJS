import _Minion_Wizard from '../_Minion_Wizard/index.js';
import BasicAttack from './spells/Blue_Minion_WizardBasicAttack.js';
import BasicAttack2 from './spells/Blue_Minion_WizardBasicAttack2.js';
import CritAttack from './spells/Blue_Minion_WizardCritAttack.js';


export default class Blue_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
