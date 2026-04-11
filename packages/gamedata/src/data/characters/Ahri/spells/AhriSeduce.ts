
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import * as Measure from '@repo/gameserver/src/gameobjectextensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import AhriSeduceMissile from './AhriSeduceMissile';


export default class AhriSeduce extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.e;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	preCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			throw new Error('No target position');

		const castRange = 975;
		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(owner, targetPosition, castRange);

		const missile = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 60,
				range: castRange,
				speed: 1550,
			},
		});

		let hitUnits: number[] = [];
		missile.eventEmitter.on('collisionUnit', (target: AttackableUnit) => {
			if (owner === target || hitUnits.includes(target.netId))
				return;

			hitUnits.push(target.netId);

			if (!target.combat)
				return;

			target.combat.damage(owner, {
				damageAmount: 60,
				damageType: DamageType.magic,
				damageSource: DamageSource.spell,
			});
		});

		missile.fire(maxRangePosition);
		castVars.missile = missile;
	}

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new AhriSeduceMissile();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
