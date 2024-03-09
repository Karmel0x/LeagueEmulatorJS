
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Nexus from '../_Turret_Nexus/index';
import ChaosTurretNormalBasicAttack from './spells/ChaosTurretNormalBasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class ChaosTurretNormal extends _Turret_Nexus {

	static spells = {
		ChaosTurretNormalBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretNormal;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.ChaosTurretNormalBasicAttack,
		});
	}
}
