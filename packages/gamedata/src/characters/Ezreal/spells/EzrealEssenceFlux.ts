
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import HashString from '@repo/packets/functions/hash-string';
import Skillshot from '@repo/gameserver/src/gameobjects/missiles/skillshot';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import EzrealEssenceFluxMissile from './EzrealEssenceFluxMissile';
import { IDefendable } from '@repo/gameserver/src/gameobjects/extensions/combat/defendable';
import AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


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
	//onCast(spellData: SpellData) {
	//
	//	this.owner.packets.AddParticleTarget(this.packageHash, this.particleHash, this.boneHash);
	//}

	static tempOnCast(spellData: SpellData, owner: AttackableUnit) {
		let particleHash = HashString.HashString(this.constructor.name + '.troy');
		let boneHash = HashString.HashString('L_HAND');

		owner.packets.AddParticleTarget(package1.packageHash, particleHash, boneHash);
	}
}

export default class EzrealEssenceFlux extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.W;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	static childSpellList = [
		EzrealEssenceFluxMissile,
	];

	async preCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			throw new Error('No target position');

		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.targetPosition, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: maxRangePosition,
			stats: {
				radius: 80,
				range: 1000,
				speed: 1550,
			},
		});

		let collidedWith: number[] = [];
		skillshot.eventEmitter.on('collision', (target) => {
			if (this.owner == target || collidedWith.includes(target.netId))
				return;

			collidedWith.push(target.netId);

			const defendableTarget = target as IDefendable;
			if (defendableTarget.combat) {
				this.owner.combat.attack(defendableTarget);
			}
		});

		spellData.spellChain.missile = skillshot;
		return await super.preCast(spellData);
	}
	onCast(spellData: SpellData) {
		super.onCast(spellData);
		ezreal_bow_yellow.tempOnCast(spellData, this.owner);

	}
}
