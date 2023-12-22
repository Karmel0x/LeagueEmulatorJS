import _Minion_Wizard from '../_Minion_Wizard/index';
import BasicAttack from './spells/Red_Minion_WizardBasicAttack';
import BasicAttack2 from './spells/Red_Minion_WizardBasicAttack2';
import CritAttack from './spells/Red_Minion_WizardCritAttack';


export default class Red_Minion_Wizard extends _Minion_Wizard {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
