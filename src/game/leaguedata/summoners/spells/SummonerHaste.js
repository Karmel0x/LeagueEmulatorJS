const _Spell = require("../../../datamethods/spells/_Spell");


module.exports = class SummonerHaste extends _Spell {
	summonerSpellKey = 6;
	summonerSpellName = 'Ghost';
	spellHash = 105565333;

	cooldown = 210;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
};
