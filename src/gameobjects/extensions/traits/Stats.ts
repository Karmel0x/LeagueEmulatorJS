
import _Character from '../../../game/datamethods/characters/_Character';
import { StatsStatsOptions } from '../../GameObjects';
import Unit from '../../units/Unit';
import { IStat, IStatLevelable, IStatStateable } from './IStat';


export default class Stats {

	base: StatsStatsOptions;

	owner: Unit;

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
	collisionRadius: number;

	constructor(owner: Unit, stats: StatsStatsOptions | undefined = undefined) {
		this.owner = owner;

		let character = owner.character?.constructor as typeof _Character;
		stats = stats || character?.stats || {};
		this.base = stats;
		//console.log(this.base);

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
		this.collisionRadius = stats.collisionRadius || 48;

		owner.once('initialized', () => {
			this.owner.emit('changeStats');
		});
	}

	increase(stats: { [s: string]: IStat; }) {
		let _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
		Object.keys(stats).forEach(name => {
			let s = stats[name];
			let t = _this[name];

			if (s.flatBonus)
				t.flatBonus += s.flatBonus;

			if (s.percentBonus)
				t.percentBonus += s.percentBonus;
		});
		this.owner.emit('changeStats');
	}

	decrease(stats: { [s: string]: IStat; }) {
		let _this = this as unknown as { [stat: string]: IStat | IStatLevelable | IStatStateable };
		Object.keys(stats).forEach(name => {
			let s = stats[name];
			let t = _this[name];

			if (s.flatBonus)
				t.flatBonus -= s.flatBonus;

			if (s.percentBonus)
				t.percentBonus -= s.percentBonus;
		});
		this.owner.emit('changeStats');
	}

	/**
	 * Friendly funtion to add stats to the unit and holding decrease function
	 * call this() to decrease stats
	 */
	temporary(stats: { [s: string]: IStat; }) {
		this.increase(stats);
		return () => this.decrease(stats);
	}
}
