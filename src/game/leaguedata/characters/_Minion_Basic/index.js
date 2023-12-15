
import slotId from '../../../../constants/slotId.js';
import _Minion from '../../../datamethods/characters/_Minion.js';
import package1 from './package.js';
//import BasicAttack from './spells/BasicAttack.js';


/**
 * @abstract
 */
export default class _Minion_Basic extends _Minion {
	static package = package1;

	static reward = {
		gold: 19,
		exp: 58.88,
	};
	static rewardPerLevel = {
		gold: 0.5,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 455,
			perLevel: 20,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 12,
			perLevel: 1,
		},
		abilityPower: 0,
		attackSpeed: 1.25,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 0,
			perLevel: 2,
		},
		resist: {
			baseValue: 0,
			perLevel: 1.25,
		},
		moveSpeed: 325,

		collisionRadius: 48,
	};

	static spells = {
		//BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
}
