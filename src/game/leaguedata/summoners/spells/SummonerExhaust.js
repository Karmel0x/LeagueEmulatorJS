const _Spell = require("../../../datamethods/spells/_Spell");


module.exports = class SummonerExhaust extends _Spell {
	summonerSpellKey = 3;
	summonerSpellName = 'Exhaust';
	spellHash = 145275620;

	cooldown = 210;
	cost = 0;
	range = 650;


	onCast(spellData) {
		super.onCast(spellData);

	}
};
