
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import ChaosTurretShrineBasicAttack from './spells/ChaosTurretShrineBasicAttack';


export default class ChaosTurretShrine extends _Turret_Fountain {

	static spells = {
		ChaosTurretShrineBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.ChaosTurretShrineBasicAttack,
		});
	}
}
