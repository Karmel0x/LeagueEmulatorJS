const { Vector2 } = require("three");
const _Spell = require("../../../DataMethods/Spells/_Spell");


module.exports = class SummonerFlash extends _Spell {
	summonerSpellKey = 4;
	summonerSpellName = 'Flash';
	spellHash = 105475752;

	cooldown = 300;
	cost = 0;
	range = 425;


	onCast(spellData){
		super.onCast(spellData);

		var pos = new Vector2(spellData.packet.position.x, spellData.packet.position.y);
		this.owner.teleport(pos);
	}
};
