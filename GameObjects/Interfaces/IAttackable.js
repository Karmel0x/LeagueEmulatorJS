
module.exports = (I) => class IAttackable extends I {


	/**
	 * 
	 * @param {Unit|Number} target|targetNetId 
	 */
	attack(target){
		if(!target.netId)
			target = global.unitsNetId[target];

		if(!target)
			return console.log('unit does not exist', target.netId, target);

		if(!target.damage)
			return console.log('unit cannot be damaged', target.netId, target.constructor.name);

		//if(this.team === target.team)
		//	return;

		console.log('BattleUnit.attack', this.netId, target.netId);
		var dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.attackDamage.total;
		target.damage(this, dmg);
	}

};
