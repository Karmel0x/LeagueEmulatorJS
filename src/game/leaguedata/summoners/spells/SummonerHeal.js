import BuffTypes from '../../../../constants/BuffTypes.js';
import _Spell from '../../../datamethods/spells/_Spell.js';


export default class SummonerHeal extends _Spell {
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

		const source = this.owner;
		source.combat.heal((this.effect.heal + (source.progress.level * this.effect.healPerLevel)) / (1 + source.buffs.hasBuff(this)));
		source.buffs.addBuffC(this);
	}
	buffActivate() {
		const source = this.owner;
		source.stats.moveSpeed.percentBonus += 30;
		source.packets.charStats_send();
	}
	buffDeactivate() {
		const source = this.owner;
		source.stats.moveSpeed.percentBonus -= 30;
		source.packets.charStats_send();
	}
}
