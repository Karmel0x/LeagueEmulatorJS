var DeathUnit = require('./Unit')


class DeathMinion extends DeathUnit {

	get Exp(){
		return this.parent.character.exp;
	}
	get Gold(){
		return this.parent.character.gold + this.parent.character.goldPer90 * parseInt(global.Game.Timer / 90);
	}

}


module.exports = DeathMinion;
