
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import ChaosTurretGiantBasicAttack from './spells/ChaosTurretGiantBasicAttack';


export default class ChaosTurretGiant extends _Turret_Inhibitor {

	static spells = {
		ChaosTurretGiantBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.ChaosTurretGiantBasicAttack,
		});
	}
}
