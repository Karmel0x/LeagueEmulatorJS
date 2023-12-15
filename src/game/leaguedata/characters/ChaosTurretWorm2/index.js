
import slotId from '../../../../constants/slotId.js';
import _Turret_Inner from '../_Turret_Inner/index.js';
import ChaosTurretWorm2BasicAttack from './spells/ChaosTurretWorm2BasicAttack.js';


export default class ChaosTurretWorm2 extends _Turret_Inner {

	static spells = {
		ChaosTurretWorm2BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretWorm2BasicAttack,
		});
	}
}
