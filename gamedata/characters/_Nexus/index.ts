
import _Character from '@workspace/gameserver/src/game/basedata/characters/character';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';
//import package1 from './package';


/**
 * @abstract
 */
export default class _Nexus extends _Character {
	//static package = package1;

	static reward = {
		gold: 50,
	};

	static stats = {
		health: 550,//5500
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 0,
		abilityPower: 0,
		attackSpeed: 0,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 0,
		armor: 0,
		resist: 0,
		moveSpeed: 0,

		collisionRadius: 200,
	};

	static spells = {

	};

	get base() {
		return this.constructor as typeof _Nexus;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

	}
}
