
class BattleUnit {

	constructor(parent){
		this.parent = parent;

	}

	attack(target){
		//if(this.parent.info.team === target.info.team)
		//	return;

		console.log('BattleUnit.attack', this.parent.netId, target.netId);
		var dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.parent.stats.AttackDamage.Total;
		target.battle.damage(this, dmg);
	}
	damage(source, dmg){
		dmg.ad -= this.parent.stats.Armor.Total;
		this.parent.stats.CurrentHealth -= dmg.ad;

		if(this.parent.stats.CurrentHealth <= 0)
			this.die(source);

		this.parent.SET_HEALTH();
	}
	die(source){
		this.parent.stats.CurrentHealth = 0;
		this.died = Date.now() / 1000;
		this.onDie(source);
		global.Teams['ALL'].vision(this.parent, false);
		this.parent.destructor();
	}
	died = false;
	onDie(source){
		// override
	}
	distanceTo(target){
		return this.parent.Position.distanceTo(target.Position);
	}
	inRange(target, range){
		return this.distanceTo(target) <= range;
	}

	heal(hp){
		this.parent.stats.CurrentHealth += hp;
		if(this.parent.stats.CurrentHealth > this.parent.stats.HealthPoints.Total)
			this.parent.stats.CurrentHealth = this.parent.stats.HealthPoints.Total;

		this.parent.SET_HEALTH();
	}
	healPercent(hpPercent){
		this.heal(this.parent.stats.HealthPoints.Total * hpPercent / 100);
	}
}


module.exports = BattleUnit;
