
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Turret_Fountain from '../_Turret_Fountain/index';
import ChaosTurretShrineBasicAttack from './spells/ChaosTurretShrineBasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class ChaosTurretShrine extends _Turret_Fountain {

	static spells = {
		ChaosTurretShrineBasicAttack,
	};

	get base() {
		return this.constructor as typeof ChaosTurretShrine;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.ChaosTurretShrineBasicAttack,
		});
	}
}
