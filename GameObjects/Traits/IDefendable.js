
const IStatOwner = require("./IStatOwner");

/**
 * Trait for units that can be attacked
 * @class
 * @param {GameObject.<IStatOwner>} I
 */
module.exports = (I) => class IDefendable extends I {

	damageReductionFromArmor(){
		return 100 / (100 + this.armor.total);
	}
	damage(source, dmg){
		//console.log('damage', dmg, this.health.current, this.health.total);
		dmg.ad = dmg.ad * this.damageReductionFromArmor();

		if(dmg.ad <= 0)
			return;

		// do not die while testing @todo remove it
		if(this.type == 'Player')
			this.health.minimum = 1;

		this.health.current -= dmg.ad;

		if(this.health.current <= 0)
			this.die(source);

		this.OnEnterLocalVisibilityClient();
	}

	die(source){
		this.health.current = 0;
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
	
	canBeAttacked(){
		return !this.died;
	}

	heal(hp){
		this.health.current += hp;
		this.OnEnterLocalVisibilityClient();
	}
	healPercent(hpPercent){
		this.heal(this.health.total * hpPercent / 100);
	}
	
};
