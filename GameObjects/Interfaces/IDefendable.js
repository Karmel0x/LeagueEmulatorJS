
module.exports = (I) => class IDefendable extends I {

	damage(source, dmg){
		//console.log('damage', dmg, this.currentHealth, this.health.total);
		dmg.ad -= this.armor.total;
		this.currentHealth -= dmg.ad;

		if(this.currentHealth <= 0)
			this.die(source);

		this.SET_HEALTH();
	}
	die(source){
		this.currentHealth = 0;
		this.died = Date.now() / 1000;
		this.onDie(source);
		global.Teams['ALL'].vision(this, false);
		this.destructor();
	}
	died = false;
	/**
	 * Called when unit dies
	 * @param {Unit} source - who killed this unit
	 */
	onDie(source){
		// override
	}

	heal(hp){
		this.currentHealth += hp;
		if(this.currentHealth > this.health.total)
			this.currentHealth = this.health.total;

		this.SET_HEALTH();
	}
	healPercent(hpPercent){
		this.heal(this.health.total * hpPercent / 100);
	}
	
};
