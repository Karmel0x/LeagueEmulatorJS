import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import { sendUnitStats } from '@workspace/gameserver/src/packet-helpers/OnReplication';
import { BuffType } from '@workspace/packets/packages/packets/base/s2c/0x68-BuffAddGroup';


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
		buffType: BuffType.haste,
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
		sendUnitStats(source);
	}
	buffDeactivate() {
		const source = this.owner;
		source.stats.moveSpeed.percentBonus -= 30;
		sendUnitStats(source);
	}
}
