
import Server from '@repo/gameserver/src/app/server';
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import HashString from '@repo/packets/functions/hash-string';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import package1 from '../package';


export default class EzrealTrueshotBarrage extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.r;

	castRange = Server.map.diagonal;

	castInfo: Partial<SCastInfoModel> = {
		//spellSlot: 45,
		designerCastTime: 1,
		designerTotalTime: 1,
	};

	preCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, targetPosition, this.castRange);

		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 160,
				range: this.castRange,
				speed: 2000,
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
		const missile = spellVars.missile as Missile;
		if (!missile) return;

		owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('Ezreal_bow_huge.troy'), HashString.HashString('L_HAND'));

		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const endPosition = new Vector2(targetPosition.x, targetPosition.y);
		missile.fire(endPosition);
	}

}
