
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import HashString from '@repo/packets/functions/hash-string';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import EzrealEssenceFluxMissile from './EzrealEssenceFluxMissile';


class _Particle {
	// todo

}

class ezreal_bow_yellow extends _Particle {
	// todo
	//owner: AttackableUnit;
	//packageHash = package1.packageHash;
	//particleHash = HashString.HashString(this.constructor.name + '.troy');
	//boneHash = HashString.HashString('L_HAND');
	//
	//onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
	//
	//	this.owner.packets.AddParticleTarget(this.packageHash, this.particleHash, this.boneHash);
	//}

	static tempOnCast(owner: AttackableUnit, castData: CastData) {
		let particleHash = HashString.HashString(this.constructor.name + '.troy');
		let boneHash = HashString.HashString('L_HAND');

		owner.packets.AddParticleTarget(package1.packageHash, particleHash, boneHash);
	}
}

export default class EzrealEssenceFlux extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.w;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	preCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const castRange = 1150;
		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, targetPosition, castRange);

		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 80,
				range: 1000,
				speed: 1550,
			},
		});

		let collidedWith: number[] = [];
		skillshot.eventEmitter.on('collision', (target: AttackableUnit) => {
			if (owner === target || collidedWith.includes(target.netId))
				return;

			collidedWith.push(target.netId);

			if (!target.combat)
				return;

			target.combat.damage(owner, {
				damageAmount: 100,
				damageType: DamageType.physical,
				damageSource: DamageSource.spell,
			});
		});

		skillshot.fire(maxRangePosition);
		spellVars.missile = skillshot;
	}

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		ezreal_bow_yellow.tempOnCast(owner, castData);

	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const Spell = EzrealEssenceFluxMissile;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);
	}

}
