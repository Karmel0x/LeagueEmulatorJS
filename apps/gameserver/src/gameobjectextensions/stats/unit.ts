
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import StatsGameObject, { type StatsGameObjectOptions } from './game-object';
import { IStat, IStatLevelable, IStatShield, IStatStateable } from './istat';


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

	visibilitySize?: number;
	//collisionRadius?: number;
	pathfindingRadius?: number;
};

export default class StatsUnit extends StatsGameObject {

	declare readonly owner: AttackableUnit;
	declare base: StatsUnitOptions;

	health!: IStatStateable;
	/** per 1s */
	healthRegen!: IStatLevelable;
	mana!: IStatStateable;
	/** per 1s */
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

	physicalShield;
	magicShield;
	mixedShield;

	armorPenetration;
	magicPenetration;

	bubbleRadius;
	critDamage;
	goldPer10Mod;
	magicReduction;
	missChance;
	physicalReduction;
	cooldownMod;
	manaCostReduction;
	expBonus;
	lifeSteal;
	multiplicativeAttackSpeedMod;
	multiplicativeMovementSpeedMod;
	respawnTimeMod;
	spellVamp;

	visibilitySize;
	//collisionRadius!: IStat;
	pathfindingRadius!: IStat;

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
		this.acquisitionRange = new IStat(750);
		this.attackRange = new IStat(stats.attackRange || 175);

		this.physicalShield = new IStatShield();
		this.magicShield = new IStatShield();
		this.mixedShield = new IStatShield();

		this.armorPenetration = new IStatLevelable(owner, 0, 0);
		this.magicPenetration = new IStatLevelable(owner, 0, 0);

		this.bubbleRadius = new IStat(0);
		this.critDamage = new IStat(0);
		this.goldPer10Mod = new IStat(0);
		this.magicReduction = new IStat(0);
		this.missChance = new IStat(0);
		this.physicalReduction = new IStat(0);
		this.cooldownMod = IStat.from({ baseValue: 0, minTotal: -0.4 });
		this.manaCostReduction = IStat.from({ baseValue: 0, minTotal: -0.4 });
		this.expBonus = new IStat(0);
		this.lifeSteal = new IStat(0);
		this.multiplicativeAttackSpeedMod = new IStat(0);
		this.multiplicativeMovementSpeedMod = new IStat(0);
		this.respawnTimeMod = new IStat(0);
		this.spellVamp = new IStat(0);

		this.visibilitySize = new IStat(0);
		//this.collisionRadius = new IStat(0);
		this.pathfindingRadius = new IStat(0);
	}

	pin(stats: Record<string, IStat>) {
		for (const stat in stats) {
			// @ts-ignore
			this[stat] = stats[stat];
		}
	}

}
