
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Champion from '@workspace/gameserver/src/game/datamethods/characters/_Champion';
import package1 from './package';

import EzrealMysticShot from './spells/EzrealMysticShot';
import EzrealEssenceFlux from './spells/EzrealEssenceFlux';
import EzrealArcaneShift from './spells/EzrealArcaneShift';
import EzrealTrueshotBarrage from './spells/EzrealTrueshotBarrage';

import EzrealBasicAttack from './spells/EzrealBasicAttack';


export default class Ezreal extends _Champion {
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
		EzrealMysticShot,
		EzrealEssenceFlux,
		EzrealArcaneShift,
		EzrealTrueshotBarrage,

		EzrealBasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[SlotId.Q]: this.constructor.spells.EzrealMysticShot,
			[SlotId.W]: this.constructor.spells.EzrealEssenceFlux,
			[SlotId.E]: this.constructor.spells.EzrealArcaneShift,
			[SlotId.R]: this.constructor.spells.EzrealTrueshotBarrage,

			[SlotId.A]: this.constructor.spells.EzrealBasicAttack,
		});
	}
}
