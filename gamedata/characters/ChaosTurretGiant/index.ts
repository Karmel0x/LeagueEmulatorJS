
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Inhibitor from '../_Turret_Inhibitor/index';
import ChaosTurretGiantBasicAttack from './spells/ChaosTurretGiantBasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class ChaosTurretGiant extends _Turret_Inhibitor {

	static spells = {
		ChaosTurretGiantBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretGiant;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.ChaosTurretGiantBasicAttack,
		});
	}
}
