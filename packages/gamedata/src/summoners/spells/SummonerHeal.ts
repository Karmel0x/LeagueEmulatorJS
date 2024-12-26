import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import _Buff from '@repo/gameserver/src/game/basedata/spells/buff';
import { sendUnitStats } from '@repo/gameserver/src/packet-helpers/OnReplication';
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';


export default class SummonerHeal extends _Buff {
	summonerSpellKey = 7;
	summonerSpellName = 'Heal';
	spellHash = 56930076;

	cooldown = 0;//300;
	cost = 0;
	range = 850;
	canMoveWhenCast = true;

	effect = {
		heal: 75,
		healPerLevel: 15,
	};
	buff = {
		buffType: BuffType.haste,
		duration: 5,
	};

	onCast(spellData: SpellData) {
		super.onCast(spellData);

		const source = this.owner;

		let healAmount = this.effect.heal + (source.progress.level * this.effect.healPerLevel);
		if (source.buffs.hasBuff(this))
			healAmount *= 0.5;

		source.combat.heal(healAmount);
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
