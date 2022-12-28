
var { IStat, IStatLevelable, IStatStateable } = require('./IStat');


/**
 * 
 * @class
 * @param {GameObject} I
 */
module.exports = (I) => class IStatOwner extends I {

	constructor(options) {
		super(options);

		this.baseStats = options.stats || this.character?.constructor.stats || {};
		//console.log(this.baseStats);
		var stats = this.baseStats;

		this.health = new IStatStateable(this, stats.health || 100);
		this.mana = new IStatStateable(this, stats.mana || 100);

		this.healthRegen = new IStatLevelable(this, stats.healthRegen || 0);
		this.manaRegen = new IStatLevelable(this, stats.manaRegen || 0);
		this.attackDamage = new IStatLevelable(this, stats.attackDamage || 0);
		this.abilityPower = new IStatLevelable(this, stats.abilityPower || 0);
		this.armor = new IStatLevelable(this, stats.armor || 0);
		this.resist = new IStatLevelable(this, stats.resist || 0);

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

		this.emit('changeStats');
	}

	/**
	 * 
	 * @param {Object} stats 
	 */
	increaseStats(stats) {
		Object.keys(stats).forEach(stat => {
			if (stats[stat].flatBonus)
				this[stat].flatBonus += stats[stat].flatBonus;

			if (stats[stat].percentBonus)
				this[stat].percentBonus += stats[stat].percentBonus;
		});
		this.emit('changeStats');
	}

	/**
	 * 
	 * @param {Object} stats 
	 */
	decreaseStats(stats) {
		Object.keys(stats).forEach(stat => {
			if (stats[stat].flatBonus)
				this[stat].flatBonus -= stats[stat].flatBonus;

			if (stats[stat].percentBonus)
				this[stat].percentBonus -= stats[stat].percentBonus;
		});
		this.emit('changeStats');
	}

	/**
	 * Friendly funtion to add stats to the unit and holding decrease function
	 * call this() to decrease stats
	 * @param {Object} stats 
	 */
	tempStats(stats) {
		this.increaseStats(stats);
		return () => this.decreaseStats(stats);
	}
};
