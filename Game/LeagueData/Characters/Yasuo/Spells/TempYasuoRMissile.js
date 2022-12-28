
const _Spell = require("../../../../DataMethods/Spells/_Spell");


module.exports = class TempYasuoRMissile extends _Spell {
	isProjectile = true;

	castInfo = {
		spellSlot: 50,
		target: [{
			unit: 0,
			hitResult: 1,
		}],
		bitfield: {
			isForceCastingOrChannel: true,
			isOverrideCastPosition: true,
		},
	};

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

};
