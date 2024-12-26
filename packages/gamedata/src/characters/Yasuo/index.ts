
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Hero from '@repo/gameserver/src/game/basedata/characters/hero';
import package1 from './package';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';

//import YasuoQW from './spells/YasuoQW';
//import YasuoQ from './spells/YasuoQ';
//import YasuoQDamage from './spells/YasuoQDamage';

//import YasuoQ2W from './spells/YasuoQ2W';
//import YasuoQ2 from './spells/YasuoQ2';

import YasuoQ3W from './spells/YasuoQ3W';
import YasuoQ3 from './spells/YasuoQ3';
import YasuoQ3Mis from './spells/YasuoQ3Mis';

import YasuoWMovingWall from './spells/YasuoWMovingWall';
import YasuoDashWrapper from './spells/YasuoDashWrapper';
import YasuoRKnockUpComboW from './spells/YasuoRKnockUpComboW';

import YasuoBasicAttack from './spells/YasuoBasicAttack';


export default class Yasuo extends _Hero {
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

		//YasuoQW,
		//YasuoQ,
		//YasuoQDamage,

		//YasuoQ2W,
		//YasuoQ2,

		YasuoQ3W,
		YasuoQ3,
		YasuoQ3Mis,

		YasuoWMovingWall,
		YasuoDashWrapper,
		YasuoRKnockUpComboW,

		YasuoBasicAttack,
		//[SlotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
		//[SlotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
		//[SlotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),

		//[SlotId.CritAttack]: require('./spells/YasuoCritAttack'),
		//[SlotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
		//[SlotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
		//[SlotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	};

	get base() {
		return this.constructor as typeof Yasuo;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.Q]: this.base.spells.YasuoQ3W,
			[SlotId.W]: this.base.spells.YasuoWMovingWall,
			[SlotId.E]: this.base.spells.YasuoDashWrapper,
			[SlotId.R]: this.base.spells.YasuoRKnockUpComboW,

			[SlotId.A]: this.base.spells.YasuoBasicAttack,
		});
	}

	//static slots = {
	//	[SlotId.Q]: require('./spells/YasuoQW'),
	//	[SlotId.W]: require('./spells/YasuoWMovingWall'),
	//	[SlotId.E]: require('./spells/YasuoDashWrapper'),
	//	[SlotId.R]: require('./spells/YasuoRKnockUpComboW'),
	//
	//	[SlotId.BasicAttack]: require('./spells/YasuoBasicAttack'),
	//	//[SlotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
	//	//[SlotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
	//	//[SlotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),
	//
	//	//[SlotId.CritAttack]: require('./spells/YasuoCritAttack'),
	//	//[SlotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
	//	//[SlotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
	//	//[SlotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	//};

}
