
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
		health: 350,
		healthPerLevel: 80,
		healthRegen: 5.5,
		healthRegenPerLevel: 0.55,
		mana: 235,
		manaPerLevel: 45,
		manaRegen: 7,
		manaRegenPerLevel: 0.65,
		attackDamage: 47.2,
		attackDamagePerLevel: 3,
		abilityPower: 0,
		attackSpeed: 0.625,
		attackSpeedPerLevel: 0,//2.8%
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 550,
		armor: 16,
		armorPerLevel: 3.5,
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
