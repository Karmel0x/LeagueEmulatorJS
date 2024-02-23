
import type Unit from '../../units/unit';
import StatsGameObject, { StatsGameObjectOptions } from './game-object';
import { IStat, IStatLevelable, IStatStateable } from './istat';


export type StatsUnitOptions = StatsGameObjectOptions & {
	health?: number;
	mana?: number;
	healthRegen?: number;
	manaRegen?: number;
	attackDamage?: number;
	abilityPower?: number;
	armor?: number;
	resist?: number;
	attackSpeed?: number;
	crit?: number;
	attackRange?: number;
	moveSpeed?: number;
	attackSpeedMultiplier?: number;//todo
	cooldownReduction?: number;
	lifeSteal?: number;
	spellVamp?: number;
	tenacity?: number;
	perceptionRange?: number;
	size?: number;
	sightRange?: number;
	critDamage?: number;
};

export default class StatsUnit extends StatsGameObject {

	declare owner: Unit;
	declare base: StatsUnitOptions;

	health: IStatStateable;
	mana: IStatStateable;

	healthRegen: IStatLevelable;
	manaRegen: IStatLevelable;
	attackDamage: IStatLevelable;
	abilityPower: IStatLevelable;
	armor: IStatLevelable;
	resist: IStatLevelable;

	attackSpeed: IStat;
	crit: IStat;
	attackRange: IStat;
	moveSpeed: IStat;

	attackSpeedMultiplier: IStat;
	cooldownReduction: IStat;
	lifeSteal: IStat;
	spellVamp: IStat;
	tenacity: IStat;

	perceptionRange: IStat;
	size: IStat;
	sightRange: IStat;

	critDamage: IStat;

	constructor(owner: Unit, stats: StatsUnitOptions = {}) {
		super(owner, stats);

		this.health = new IStatStateable(owner, stats.health || 100);
		this.mana = new IStatStateable(owner, stats.mana || 100);

		this.healthRegen = new IStatLevelable(owner, stats.healthRegen || 0);
		this.manaRegen = new IStatLevelable(owner, stats.manaRegen || 0);
		this.attackDamage = new IStatLevelable(owner, stats.attackDamage || 0);
		this.abilityPower = new IStatLevelable(owner, stats.abilityPower || 0);
		this.armor = new IStatLevelable(owner, stats.armor || 0);
		this.resist = new IStatLevelable(owner, stats.resist || 0);

		this.attackSpeed = new IStat(stats.attackSpeed || 1);
		this.crit = new IStat(stats.crit || 0);
		this.attackRange = new IStat(stats.attackRange || 175);
		this.moveSpeed = new IStat(stats.moveSpeed || 325);

		this.attackSpeedMultiplier = new IStat(stats.attackSpeedMultiplier || 1);// ? (+ 1)
		this.cooldownReduction = new IStat(stats.cooldownReduction || 0);
		this.lifeSteal = new IStat(stats.lifeSteal || 0);
		this.spellVamp = new IStat(stats.spellVamp || 0);
		this.tenacity = new IStat(stats.tenacity || 0);

		this.perceptionRange = new IStat(stats.perceptionRange || 1);
		this.size = new IStat(stats.size || 1);
		this.sightRange = new IStat(stats.sightRange || 1350);

		this.critDamage = new IStat(stats.critDamage || 2);
		this.collisionRadius = new IStat(stats.collisionRadius || 48);
	}

}
