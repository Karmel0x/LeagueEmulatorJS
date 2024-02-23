
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inner from '../_Turret_Inner/index';
import ChaosTurretWorm2BasicAttack from './spells/ChaosTurretWorm2BasicAttack';


export default class ChaosTurretWorm2 extends _Turret_Inner {

	static spells = {
		ChaosTurretWorm2BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.A]: this.constructor.spells.ChaosTurretWorm2BasicAttack,
		});
	}
}
