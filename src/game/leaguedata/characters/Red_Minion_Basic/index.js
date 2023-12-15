import _Minion_Basic from '../_Minion_Basic/index.js';
import BasicAttack from './spells/Red_Minion_BasicBasicAttack.js';
import BasicAttack2 from './spells/Red_Minion_BasicBasicAttack2.js';
import CritAttack from './spells/Red_Minion_BasicCritAttack.js';


export default class Red_Minion_Basic extends _Minion_Basic {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
