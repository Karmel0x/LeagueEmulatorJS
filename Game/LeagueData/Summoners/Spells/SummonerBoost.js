const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerBoost extends _Spell {
	summonerSpellKey = 1;
	summonerSpellName = 'Cleanse';
	spellHash = 105717908;

	cooldown = 210;
	cost = 0;


	onCast(spellData){
		super.onCast(spellData);

	}
};
