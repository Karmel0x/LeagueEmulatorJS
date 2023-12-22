
import slotId from '../../../../constants/slotId';
import _Turret_Nexus from '../_Turret_Nexus/index';
import ChaosTurretNormalBasicAttack from './spells/ChaosTurretNormalBasicAttack';


export default class ChaosTurretNormal extends _Turret_Nexus {

	static spells = {
		ChaosTurretNormalBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretNormalBasicAttack,
		});
	}
}
