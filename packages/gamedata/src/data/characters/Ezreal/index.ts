
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';

import EzrealArcaneShift from './spells/EzrealArcaneShift';
import EzrealBasicAttack from './spells/EzrealBasicAttack';
import EzrealEssenceFlux from './spells/EzrealEssenceFlux';
import EzrealMysticShot from './spells/EzrealMysticShot';
import EzrealTrueshotBarrage from './spells/EzrealTrueshotBarrage';


export default class Ezreal extends Character {
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
		[SlotId.q]: EzrealMysticShot,
		[SlotId.w]: EzrealEssenceFlux,
		[SlotId.e]: EzrealArcaneShift,
		[SlotId.r]: EzrealTrueshotBarrage,

		[SlotId.a]: EzrealBasicAttack,
	};

	get base() {
		return this.constructor as typeof Ezreal;
	}

}
