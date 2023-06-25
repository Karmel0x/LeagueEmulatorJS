const BuffTypes = require("../../../../constants/BuffTypes");
const _Spell = require("../../../datamethods/spells/_Spell");


module.exports = class SummonerHeal extends _Spell {
	summonerSpellKey = 7;
	summonerSpellName = 'Heal';
	spellHash = 56930076;

	cooldown = 0;//300;
	cost = 0;
	range = 850;

	effect = {
		heal: 75,
		healPerLevel: 15,
	};
	buff = {
		buffType: BuffTypes.Haste,
		duration: 5,
	};
	onCast(spellData) {
		super.onCast(spellData);

		var source = this.owner;
		source.heal((this.effect.heal + (source.level * this.effect.healPerLevel)) / (1 + source.hasBuff(this)));
		source.addBuffC(this);
	}
	buffActivate() {
		var source = this.owner;
		source.moveSpeed.percentBonus += 30;
		source.charStats_send();
	}
	buffDeactivate() {
		var source = this.owner;
		source.moveSpeed.percentBonus -= 30;
		source.charStats_send();
	}
};
