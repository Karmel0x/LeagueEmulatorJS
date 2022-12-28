const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerMana extends _Spell {
	summonerSpellKey = 13;
	summonerSpellName = 'Clarity';
	spellHash = 56980513;

	cooldown = 180;
	cost = 0;


	onCast(spellData) {
		super.onCast(spellData);

	}
};
