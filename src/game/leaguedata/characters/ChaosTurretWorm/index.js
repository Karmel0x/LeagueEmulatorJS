
import slotId from '../../../../constants/slotId.js';
import _Turret_Outer from '../_Turret_Outer/index.js';
import ChaosTurretWormBasicAttack from './spells/ChaosTurretWormBasicAttack.js';


export default class ChaosTurretWorm extends _Turret_Outer {

	static spells = {
		ChaosTurretWormBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretWormBasicAttack,
		});
	}
}
