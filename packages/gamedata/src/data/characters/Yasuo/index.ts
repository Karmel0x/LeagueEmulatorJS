
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';

import YasuoBasicAttack from './spells/YasuoBasicAttack';
import YasuoDashWrapper from './spells/YasuoDashWrapper';
import YasuoQ3W from './spells/YasuoQ3W';
import YasuoRKnockUpComboW from './spells/YasuoRKnockUpComboW';
import YasuoWMovingWall from './spells/YasuoWMovingWall';


export default class Yasuo extends Character {
	static package = package1;

	static stats = {
		health: {
			baseValue: 380,
			perLevel: 82,
		},
		healthRegen: {
			baseValue: 5,
			perLevel: 0.9,
		},
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 50,
			perLevel: 3.2,
		},
		abilityPower: 0,
		attackSpeed: {
			baseValue: 0.658,
			perLevel: 0,//3.2%
		},
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 175,
		armor: {
			baseValue: 19,
			perLevel: 3.4,
		},
		resist: 30,
		moveSpeed: 340,
	};

	static spells = {
		[SlotId.q]: YasuoQ3W,
		[SlotId.w]: YasuoWMovingWall,
		[SlotId.e]: YasuoDashWrapper,
		[SlotId.r]: YasuoRKnockUpComboW,

		[SlotId.a]: YasuoBasicAttack,
	};

	get base() {
		return this.constructor as typeof Yasuo;
	}

}
