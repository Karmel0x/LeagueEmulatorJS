
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Hero from '@workspace/gameserver/src/game/basedata/characters/hero';
import package1 from './package';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';

import AnnieBasicAttack from './spells/AnnieBasicAttack';

export default class Annie extends _Hero {
	static package = package1;

	static stats = {
		health: {
			baseValue: 350,
			perLevel: 80,
		},
		healthRegen: {
			baseValue: 5.5,
			perLevel: 0.55,
		},
		mana: {
			baseValue: 235,
			perLevel: 45,
		},
		manaRegen: {
			baseValue: 7,
			perLevel: 0.65,
		},
		attackDamage: {
			baseValue: 47.2,
			perLevel: 3,
		},
		abilityPower: 0,
		attackSpeed: {
			baseValue: 0.625,
			perLevel: 0,//2.8%
		},
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 550,
		armor: {
			baseValue: 16,
			perLevel: 3.5,
		},
		resist: 30,
		moveSpeed: 325,
	};

	static spells = {
		AnnieBasicAttack,
	};

	get base() {
		return this.constructor as typeof Annie;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			//[SlotId.Q]: this.base.spells.,
			//[SlotId.W]: this.base.spells.,
			//[SlotId.E]: this.base.spells.,
			//[SlotId.R]: this.base.spells.,

			[SlotId.A]: this.base.spells.AnnieBasicAttack,
		});
	}
}
