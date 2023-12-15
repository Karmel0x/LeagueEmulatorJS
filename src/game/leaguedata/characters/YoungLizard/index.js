
import slotId from '../../../../constants/slotId.js';
import _Monster from '../../../datamethods/characters/_Monster.js';
import package1 from './package.js';
import BasicAttack from './spells/YoungLizardBasicAttack.js';


export default class YoungLizard extends _Monster {
	static package = package1;

	static reward = {
		gold: 7,
		exp: 20,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0.14,
	};

	static stats = {
		health: {
			baseValue: 400,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 12,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.679,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 500,
		armor: {
			baseValue: 8,
			perLevel: 0,
		},
		resist: {
			baseValue: 0,
			perLevel: 0,
		},
		moveSpeed: 330,

		collisionRadius: 48,
	};

	static spells = {
		BasicAttack,
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
}
