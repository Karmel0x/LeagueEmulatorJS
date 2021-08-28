const { Vector2 } = require("three");
const Spell = require("./Spell");


class SummonerSpell extends Spell {
	constructor(parent){
		super(parent);
	}
	cast(packet){
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;//?
		CastInfo.SpellHash = this.spellHash;
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
	}
}

class SummonerBarrier extends SummonerSpell {// Barrier
	spellHash = 214940034;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerBoost extends SummonerSpell {// Cleanse
	spellHash = 105717908;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerClairvoyance extends SummonerSpell {// Clairvoyance
	spellHash = 159999845;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerDot extends SummonerSpell {// Ignite
	spellHash = 104222500;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerExhaust extends SummonerSpell {// Exhaust
	spellHash = 145275620;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerFlash extends SummonerSpell {// Flash
	spellHash = 105475752;
	cast(packet){
		super.cast(packet);

		var pos = new Vector2(packet.Position.x, packet.Position.y);
		this.parent.parent.teleport(pos);
	}
}
class SummonerHaste extends SummonerSpell {// Ghost
	spellHash = 105565333;
	cast(packet){
		super.cast(packet);

	}
}
//class SummonerHealReduce? extends Spell {// Heal Reduce
//	//todo
//}
class SummonerHeal extends SummonerSpell {// Heal
	spellHash = 56930076;
	effect = {
		Base: 75,
		PerLevel: 15,
	};
	buff = {
		BuffType: 14,
		Duration: 5,
	};
	cast(packet){
		super.cast(packet);

		var source = this.parent.parent;
		source.battle.heal((this.effect.Base + (source.stats.Level * this.effect.PerLevel)) / (1 + source.buffController.hasBuffC(this)));
		source.buffController.addBuffC(this);
	}
	buffActivate(){
		var source = this.parent.parent;
		source.stats.MoveSpeed.PercentBonus += 30;
		source.stats.charStats_send();
	}
	buffDeactivate(){
		var source = this.parent.parent;
		source.stats.MoveSpeed.PercentBonus -= 30;
		source.stats.charStats_send();
	}
}
class SummonerMana extends SummonerSpell {// Clarity
	spellHash = 56980513;
	cast(packet){
		super.cast(packet);

	}
}
//class SummonerOdinGarrison extends SummonerSpell {// OdinGarrison
//	spellHash = 226996206;
//	cast(packet){
//		super.cast(packet);
//
//	}
//}
class SummonerRevive extends SummonerSpell {// Revive
	spellHash = 97039269;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerSmite extends SummonerSpell {// Smite
	spellHash = 106858133;
	cast(packet){
		super.cast(packet);

	}
}
class SummonerTeleport extends SummonerSpell {// Teleport
	spellHash = 5182308;
	cast(packet){
		super.cast(packet);

	}
}

var SummonerSpellList = {
	SummonerBarrier,
	SummonerBoost,
	SummonerClairvoyance,
	SummonerDot,
	SummonerExhaust,
	SummonerFlash,
	SummonerHaste,
	SummonerHeal,
	SummonerMana,
	//SummonerOdinGarrison, // Dominion
	SummonerRevive,
	SummonerSmite,
	SummonerTeleport,
};

module.exports = class SummonerSpells {
	PackageHash = 3579051965;
    constructor(parent, spell1 = 'SummonerHeal', spell2 = 'SummonerFlash'){
		this.parent = parent;

        this.spells = {
            0: new SummonerSpellList[spell1](this),
            1: new SummonerSpellList[spell2](this),
        }
    }
    castSpell(packet){
        this.spells[packet.Slot - 4].cast(packet);
    }
};;
