const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerTeleport extends _Spell {
	summonerSpellKey = 12;
	summonerSpellName = 'Teleport';
	spellHash = 5182308;

	cooldown = 300;
	cost = 0;
	range = 25000;


	onCast(spellData){
		super.onCast(spellData);

	}
};
