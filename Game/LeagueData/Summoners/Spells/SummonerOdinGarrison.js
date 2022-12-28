const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerOdinGarrison extends _Spell {
	summonerSpellKey = 17;
	summonerSpellName = 'Garrison';
	spellHash = 226996206;

	cooldown = 210;
	cost = 0;
	range = 1250;


	onCast(spellData) {
		super.onCast(spellData);

	}
};
