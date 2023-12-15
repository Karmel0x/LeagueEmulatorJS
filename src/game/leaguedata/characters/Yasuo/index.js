
import slotId from '../../../../constants/slotId.js';
import _Champion from '../../../datamethods/characters/_Champion.js';
import package1 from './package.js';

//import YasuoQW from './spells/YasuoQW.js';
//import YasuoQ from './spells/YasuoQ.js';
//import YasuoQDamage from './spells/YasuoQDamage.js';

//import YasuoQ2W from './spells/YasuoQ2W.js';
//import YasuoQ2 from './spells/YasuoQ2.js';

import YasuoQ3W from './spells/YasuoQ3W.js';
import YasuoQ3 from './spells/YasuoQ3.js';
import YasuoQ3Mis from './spells/YasuoQ3Mis.js';

import YasuoWMovingWall from './spells/YasuoWMovingWall.js';
import YasuoDashWrapper from './spells/YasuoDashWrapper.js';
import YasuoRKnockUpComboW from './spells/YasuoRKnockUpComboW.js';

import YasuoBasicAttack from './spells/YasuoBasicAttack.js';


export default class Yasuo extends _Champion {
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
		//[slotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
		//[slotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
		//[slotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),

		//[slotId.CritAttack]: require('./spells/YasuoCritAttack'),
		//[slotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
		//[slotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
		//[slotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.Q]: this.constructor.spells.YasuoQ3W,
			[slotId.W]: this.constructor.spells.YasuoWMovingWall,
			[slotId.E]: this.constructor.spells.YasuoDashWrapper,
			[slotId.R]: this.constructor.spells.YasuoRKnockUpComboW,

			[slotId.A]: this.constructor.spells.YasuoBasicAttack,
		});
	}

	//static slots = {
	//	[slotId.Q]: require('./spells/YasuoQW'),
	//	[slotId.W]: require('./spells/YasuoWMovingWall'),
	//	[slotId.E]: require('./spells/YasuoDashWrapper'),
	//	[slotId.R]: require('./spells/YasuoRKnockUpComboW'),
	//
	//	[slotId.BasicAttack]: require('./spells/YasuoBasicAttack'),
	//	//[slotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
	//	//[slotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
	//	//[slotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),
	//
	//	//[slotId.CritAttack]: require('./spells/YasuoCritAttack'),
	//	//[slotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
	//	//[slotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
	//	//[slotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	//};

}
