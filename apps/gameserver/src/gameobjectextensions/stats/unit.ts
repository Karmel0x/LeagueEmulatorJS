
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import StatsGameObject, { type StatsGameObjectOptions } from './game-object';
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

	declare readonly owner: AttackableUnit;
	declare base: StatsUnitOptions;

	health!: IStatStateable;
	healthRegen!: IStatLevelable;
	mana!: IStatStateable;
	manaRegen!: IStatLevelable;
	attackDamage!: IStatLevelable;
	abilityPower!: IStatLevelable;
	armor!: IStatLevelable;
	magicResist!: IStatLevelable;
	attackSpeed!: IStatLevelable;
	critChance!: IStatLevelable;
	dodge!: IStatLevelable;
	moveSpeed!: IStat;
	acquisitionRange!: IStat;
	attackRange!: IStat;
	//collisionRadius!: IStat;
	//pathfindingRadius!: IStat;
	physicalShield;
	magicShield;
	armorPenetration;
	magicPenetration;
	bubbleRadius;
	critDamage;
	goldPer10Mod;
	magicReduction;
	missChance;
	physicalReduction;
	cooldownMod;
	expBonus;
	lifeSteal;
	multiplicativeAttackSpeedMod;
	multiplicativeMovementSpeedMod;
	respawnTimeMod;
	spellVamp;

	constructor(owner: AttackableUnit, stats: StatsUnitOptions = {}) {
		super(owner, stats);

		this.health = new IStatStateable(owner, stats.health || 100);
		this.healthRegen = new IStatLevelable(owner, stats.healthRegen || 0);
		this.mana = new IStatStateable(owner, stats.mana || 100);
		this.manaRegen = new IStatLevelable(owner, stats.manaRegen || 0);
		this.attackDamage = new IStatLevelable(owner, stats.attackDamage || 0);
		this.abilityPower = new IStatLevelable(owner, stats.abilityPower || 0);
		this.armor = new IStatLevelable(owner, stats.armor || 0);
		this.magicResist = new IStatLevelable(owner, 0);
		this.attackSpeed = new IStatLevelable(owner, stats.attackSpeed || 0.625);
		this.critChance = new IStatLevelable(owner, 0);
		this.dodge = new IStatLevelable(owner, 0);
		this.moveSpeed = new IStat(stats.moveSpeed || 325);
		this.acquisitionRange = new IStat(175);
		this.attackRange = new IStat(stats.attackRange || 175);

		this.physicalShield = new IStatStateable(owner, 0, 0);
		this.magicShield = new IStatStateable(owner, 0, 0);
		this.armorPenetration = new IStatLevelable(owner, 0, 0);
		this.magicPenetration = new IStatLevelable(owner, 0, 0);

		this.bubbleRadius = new IStat(owner);
		this.critDamage = new IStat(owner);
		this.goldPer10Mod = new IStat(owner);
		this.magicReduction = new IStat(owner);
		this.missChance = new IStat(owner);
		this.physicalReduction = new IStat(owner);
		this.cooldownMod = new IStat(owner);
		this.expBonus = new IStat(owner);
		this.lifeSteal = new IStat(owner);
		this.multiplicativeAttackSpeedMod = new IStat(owner);
		this.multiplicativeMovementSpeedMod = new IStat(owner);
		this.respawnTimeMod = new IStat(owner);
		this.spellVamp = new IStat(owner);
	}

}
