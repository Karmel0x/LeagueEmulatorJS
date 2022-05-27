
var IStat = require('./IStat');


module.exports = (I) => class IStatOwner extends I {

	refreshStats(){
		var stats = this.baseStats;
		var currentLevel = this.level;
		console.log('refreshStats', this.constructor.name, this.netId, currentLevel);
		this.health.baseValue = stats.health + (stats.healthPerLevel * currentLevel);
		this.mana.baseValue = stats.mana + (stats.manaPerLevel * currentLevel);
		this.armor.baseValue = stats.armor + (stats.armorPerLevel * currentLevel);
		this.resist.baseValue = stats.resist + (stats.resistPerLevel * currentLevel);
		this.healthRegen.baseValue = stats.healthRegen + (stats.healthRegenPerLevel * currentLevel);
		this.manaRegen.baseValue = stats.manaRegen + (stats.manaRegenPerLevel * currentLevel);
		this.crit.baseValue = stats.crit + (stats.critPerLevel * currentLevel);
		this.attackDamage.baseValue = stats.attackDamage + (stats.attackDamagePerLevel * currentLevel);
		this.attackSpeed.baseValue = stats.attackSpeed + (stats.attackSpeedPerLevel * currentLevel);
		this.emit('changeStats');
	}
	constructor(...args){
		super(...args);

		this.baseStats = args[0].stats || this.character?.constructor.stats || {};// || args[0].character.stats
		//console.log(this.baseStats);
		var stats = this.baseStats;

		this.moveSpeed = new IStat(stats.moveSpeed || 325);
		this.attackRange = new IStat(stats.attackRange || 175);

		this.health = new IStat();
		this.mana = new IStat();
		this.armor = new IStat();
		this.resist = new IStat();
		this.healthRegen = new IStat();
		this.manaRegen = new IStat();
		this.crit = new IStat();
		this.attackDamage = new IStat();
		this.attackSpeed = new IStat();

		this.on('levelup', this.refreshStats);
		this.refreshStats();

		this.currentHealth = this.health.total;
		this.currentMana = this.mana.total;

		this.abilityPower = new IStat(stats.abilityPower || 0);
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
	}

	/**
	 * 
	 * @param {Object} stats 
	 */
	increaseStats(stats){
		Object.keys(stats).forEach(stat => {
			if(stats[stat].Flat)
				this[stat].flatBonus += stats[stat].Flat;

			if(stats[stat].Percent)
				this[stat].percentBonus += stats[stat].Percent;
		});
	}

	/**
	 * 
	 * @param {Object} stats 
	 */
	decreaseStats(stats){
		Object.keys(stats).forEach(stat => {
			if(stats[stat].Flat)
				this[stat].flatBonus -= stats[stat].Flat;

			if(stats[stat].Percent)
				this[stat].percentBonus -= stats[stat].Percent;
		});
	}

	/**
	 * Friendly funtion to add stats to the unit and holding decrease function
	 * call this() to decrease stats
	 * @param {Object} stats 
	 */
	tempStats(stats){
		increaseStats(stats);
		return () => decreaseStats(stats);
	}
};
