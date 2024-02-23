
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import HashString from '@workspace/packets/packages/packets/functions/hash-string';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import EzrealEssenceFluxMissile from './EzrealEssenceFluxMissile';


class _Particle {
	// todo

}

class ezreal_bow_yellow extends _Particle {
	// todo

	packageHash = package1.packageHash;
	particleHash = HashString.HashString(this.constructor.name + '.troy');
	boneHash = HashString.HashString('L_HAND');

	onCast(spellData) {

		this.owner.packets.AddParticleTarget(this.packageHash, this.particleHash, this.boneHash);
	}
	static tempOnCast(spellData, owner) {
		let particleHash = HashString.HashString(this.constructor.name + '.troy');
		let boneHash = HashString.HashString('L_HAND');

		owner.packets.AddParticleTarget(package1.packageHash, particleHash, boneHash);
	}
}

export default class EzrealEssenceFlux extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.W;

	castInfo = {
		target: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	static childSpellList = [
		EzrealEssenceFluxMissile,
	];

	preCast(spellData) {
		spellData.maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: spellData.maxRangePosition,
			stats: {
				radius: 80,
				range: 1000,
				speed: 1550,
			},
		});

		let collidedWith: number[] = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: 80,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.combat.attack(target);
			},
		};

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);
		ezreal_bow_yellow.tempOnCast(spellData, this.owner);

	}
}
