import { BuffAddType } from '@repo/gameserver/src/gameobjects/extensions/traits/buff-manager';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { sendUnitStats } from '@repo/gameserver/src/packet-helpers/on-replication';
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import type { CastData } from '@repo/scripting/base/spell';
import SpellBuff from '@repo/scripting/base/spell-buff';


export default class SummonerHeal extends SpellBuff {
	summonerSpellKey = 7;
	summonerSpellName = 'Heal';
	//spellHash = 56930076;

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

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

		let healAmount = this.effect.heal + (owner.progress.level * this.effect.healPerLevel);
		if (owner.buffManager.hasBuff(this))
			healAmount *= 0.5;

		owner.combat.heal(owner, healAmount);
		owner.buffManager.addBuff(this, owner, {
			addType: BuffAddType.replaceExisting,
			buffType: BuffType.haste,
			maxStack: 1,
			numberOfStacks: 1,
			duration: 5,
		});
	}

	buffActivate(owner: AttackableUnit, attacker?: AttackableUnit, buffVars?: any) {
		owner.stats.moveSpeed.percentBonus += 30;
		sendUnitStats(owner);
	}

	buffDeactivate(owner: AttackableUnit, attacker?: AttackableUnit, buffVars?: any) {
		owner.stats.moveSpeed.percentBonus -= 30;
		sendUnitStats(owner);
	}

}
