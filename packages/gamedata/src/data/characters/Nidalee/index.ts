
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';

import NidaleeBasicAttack from './spells/NidaleeBasicAttack';


export default class Nidalee extends Character {
	static package = package1;

	static stats = {
		health: 380,
		healthPerLevel: 82,
		healthRegen: 5,
		healthRegenPerLevel: 0.9,
		mana: 0,
		manaRegen: 0,
		attackDamage: 50,
		attackDamagePerLevel: 3.2,
		abilityPower: 0,
		attackSpeed: 0.658,
		attackSpeedPerLevel: 0,//3.2%
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 600,
		armor: 19,
		armorPerLevel: 3.4,
		resist: 30,
		moveSpeed: 340,

		collisionRadius: 50,
	};

	static spells = {
		[SlotId.a]: NidaleeBasicAttack,
	};

	get base() {
		return this.constructor as typeof Nidalee;
	}

}
