const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerClairvoyance extends _Spell {
	summonerSpellKey = 2;
	summonerSpellName = 'Clairvoyance';
	spellHash = 159999845;

	cooldown = 55;
	cost = 0;
	range = 25000;


	onCast(spellData){
		super.onCast(spellData);

	}
};
