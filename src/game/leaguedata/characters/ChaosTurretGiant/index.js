
import slotId from '../../../../constants/slotId.js';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index.js';
import ChaosTurretGiantBasicAttack from './spells/ChaosTurretGiantBasicAttack.js';


export default class ChaosTurretGiant extends _Turret_Inhibitor {

	static spells = {
		ChaosTurretGiantBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretGiantBasicAttack,
		});
	}
}
