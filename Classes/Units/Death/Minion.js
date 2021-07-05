var DeathUnit = require('./Unit')


class DeathMinion extends DeathUnit {

	get Exp(){
		return this.parent.base.exp;
	}
	get Gold(){
		return this.parent.base.gold + this.parent.base.goldPer90 * parseInt(global.Game.Timer / 90);
	}

}


module.exports = DeathMinion;
