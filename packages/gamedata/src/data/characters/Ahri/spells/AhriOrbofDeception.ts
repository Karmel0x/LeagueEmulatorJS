
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import * as Measure from '@repo/gameserver/src/gameobjectextensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import AhriOrbMissile from './AhriOrbMissile';
import AhriOrbReturn from './AhriOrbReturn';


export default class AhriOrbofDeception extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.q;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	preCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const castRange = 880;
		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, targetPosition, castRange);

		const orb = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 65,
				range: castRange,
				speed: 1650,
			},
		});

		let hitUnits: number[] = [];
		orb.eventEmitter.on('collisionUnit', (target: AttackableUnit) => {
			if (owner === target || hitUnits.includes(target.netId))
				return;

			hitUnits.push(target.netId);

			if (!target.combat)
				return;

			target.combat.damage(owner, {
				damageAmount: 40,
				damageType: DamageType.magic,
				damageSource: DamageSource.spell,
			});
		});

		orb.fire(maxRangePosition);
		castVars.missile = orb;
		castVars.hitUnits = hitUnits;
	}

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new AhriOrbMissile();
		const spellCast1 = new SpellCast(spell1, owner, castData);
		spellCast1.castVars = castVars;
		await spellCast1.castSpell();

		const spell2 = new AhriOrbReturn();
		const spellCast2 = new SpellCast(spell2, owner, castData);
		spellCast2.castVars = castVars;
		await spellCast2.castSpell();
	}

}
