const _Character = require("../_Character");


module.exports = class _Turret extends _Character {

	castSpell(packet){
		this.spells.castSpell(packet);
	}
};
