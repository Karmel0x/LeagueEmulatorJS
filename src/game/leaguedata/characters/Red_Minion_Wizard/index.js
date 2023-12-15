import _Minion_Wizard from '../_Minion_Wizard/index.js';
import BasicAttack from './spells/Red_Minion_WizardBasicAttack.js';
import BasicAttack2 from './spells/Red_Minion_WizardBasicAttack2.js';
import CritAttack from './spells/Red_Minion_WizardCritAttack.js';


export default class Red_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
