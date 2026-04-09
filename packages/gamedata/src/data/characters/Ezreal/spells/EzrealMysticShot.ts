
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import * as Measure from '@repo/gameserver/src/gameobjectextensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { sendUnitParticle } from '@repo/gameserver/src/packet-helpers';
import HashString from '@repo/packets/functions/hash-string';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import EzrealMysticShotMissile from './EzrealMysticShotMissile';


export default class EzrealMysticShot extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.q;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
		//cooldown: 6,
		//manaCost: 28,
	};

	preCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const castRange = 1150;
		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, targetPosition, castRange);

		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 60,
				range: 1150,
				speed: 2000,
			},
		});

		let collidedWith: number[] = [];
		skillshot.eventEmitter.on('collisionUnit', (target: AttackableUnit) => {
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
		castVars.missile = skillshot;
	}

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

		sendUnitParticle(owner, [{
			packageHash: this.packageHash,
			effectNameHash: HashString.HashString('ezreal_bow.troy'),
			flags: 32,
			boneNameHash: HashString.HashString('L_HAND'),
			createData: [{
				positionNCC: owner.position,
				ownerPositionNCC: owner.position,
				targetPositionNCC: owner.position,
			}],
		}]);

	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new EzrealMysticShotMissile();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
