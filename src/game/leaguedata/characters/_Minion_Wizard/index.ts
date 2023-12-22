
import slotId from '../../../../constants/slotId';
import _Minion from '../../../datamethods/characters/_Minion';
import package1 from './package';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_Wizard extends _Minion {
	static package = package1;

	static reward = {
		gold: 14,
		exp: 29.44,
	};
	static rewardPerLevel = {
		gold: 0.4,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 290,
			perLevel: 15,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 23,
			perLevel: 2,
		},
		attackSpeed: 0.67,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 600,
		armor: {
			baseValue: 0,
			perLevel: 1.25,
		},
		resist: {
			baseValue: 0,
			perLevel: 2,
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
