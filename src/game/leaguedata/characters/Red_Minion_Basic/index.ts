import _Minion_Basic from '../_Minion_Basic/index';
import BasicAttack from './spells/Red_Minion_BasicBasicAttack';
import BasicAttack2 from './spells/Red_Minion_BasicBasicAttack2';
import CritAttack from './spells/Red_Minion_BasicCritAttack';


export default class Red_Minion_Basic extends _Minion_Basic {

	static spells = {
		BasicAttack,
		BasicAttack2,
		CritAttack,
	};

}
