
import { IStat, IStatLevelable, IStatStateable } from './IStat.js';


export default class Stats {

	/**
	 * @type {import('../../GameObjects.js').StatsStatsOptions}
	 */
	base;

	/**
	 * @param {import('../../units/Unit.js').default} owner 
	 * @param {import('../../GameObjects.js').StatsStatsOptions} stats 
	 */
	constructor(owner, stats = {}) {
		this.owner = owner;

		stats = stats || owner.character?.constructor.stats || {};
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

	/**
	 * 
	 * @param {Object.<string, IStat>} stats 
	 */
	increase(stats) {
		let _this = /** @type {Object<string, IStat | IStatLevelable | IStatStateable>} */ (/** @type {*} */ (this));
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

	/**
	 * 
	 * @param {Object.<string, IStat>} stats 
	 */
	decrease(stats) {
		let _this = /** @type {Object<string, IStat | IStatLevelable | IStatStateable>} */ (/** @type {*} */ (this));
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
	 * @param {Object.<string, IStat>} stats 
	 */
	temporary(stats) {
		this.increase(stats);
		return () => this.decrease(stats);
	}
}
