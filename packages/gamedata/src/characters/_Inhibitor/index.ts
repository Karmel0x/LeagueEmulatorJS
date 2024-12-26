
import _Character from '@repo/gameserver/src/game/basedata/characters/character';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
//import package1 from './package';


/**
 * @abstract
 */
export default class _Inhibitor extends _Character {
	//static package = package1;

	static reward = {
		gold: 50,
	};

	static stats = {
		health: 400,//4000
		healthRegen: 15,
		mana: 0,
		manaRegen: 0,
		attackDamage: 0,
		abilityPower: 0,
		attackSpeed: 0,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 0,
		armor: 20,
		resist: 0,
		moveSpeed: 0,

		collisionRadius: 100,//??
	};

	static spells = {

	};

	get base() {
		return this.constructor as typeof _Inhibitor;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

	}
}
