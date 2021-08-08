const { Vector2 } = require("three");
const Spell = require("./Spell");
//const Skillshot = require("../Classes/Attacks/Missiles/Skillshot");


const spellHash = {
	SummonerHeal: 0,
	SummonerFlash: 0,
	SummonerExhaust: 0,
	SummonerHaste: 0,
	SummonerRevive: 0,
	SummonerSmite: 0,
};

{
	// just for development
	const { HashStringObject } = require("../Functions/HashString");
	HashStringObject(spellHash);
}


module.exports = class SummonerSpell extends Spell {
	constructor(parent, name){
		super(parent);
		this.name = name;
	}
	cast(packet){

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellNetID = 1073743441;
		CastInfo.MissileNetID = 1073743444;
		CastInfo.SpellHash = spellHash[this.name];
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
	}
};
