
import Skillshot from '@repo/gameserver/src/gameobjects/missiles/skillshot';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import HashString from '@repo/packets/functions/hash-string';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { IDefendable } from '@repo/gameserver/src/gameobjects/extensions/combat/defendable';
import Server from '@repo/gameserver/src/app/server';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


export default class EzrealTrueshotBarrage extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.R;

	castRange = Server.map.diagonal;

	castInfo: Partial<SCastInfoModel> = {
		//spellSlot: 45,
		designerCastTime: 1,
		designerTotalTime: 1,
	};

	async preCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			throw new Error('No target position');

		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.targetPosition, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: maxRangePosition,
			stats: {
				radius: 160,
				range: this.castRange,
				speed: 2000,
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
		const missile = spellData.spellChain.missile;
		if (!missile) return;

		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('Ezreal_bow_huge.troy'), HashString.HashString('L_HAND'));

		this.fireMissile(missile);
	}

	async fireMissile(missile: Missile) {

		let windup = 1;//?
		await Promise.delay(windup * 1000);
		missile.fire(missile.target);

		await Promise.delay(windup * 1000 / 2);
	}
}
