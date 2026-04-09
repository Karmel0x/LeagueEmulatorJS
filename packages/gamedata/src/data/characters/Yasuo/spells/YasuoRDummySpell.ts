
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import TempYasuoRMissile from './TempYasuoRMissile';


export default class YasuoRDummySpell extends _Spell {

	spellSlot = SlotId.es1;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: -1,
		designerTotalTime: 0.7,
	};

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		if (!castVars.anglePosition)
			return false;

		castVars._CastInfo.targets = [{
			unitNetId: owner.netId,
			hitResult: 1,
		}];

		let skillshotTargetPosition = castVars.anglePosition.add(owner.position);

		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 90,
				range: 1150,
				speed: 1200,
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

			//if(target.moving.knockUp)
			//	target.moving.knockUp({
			//		duration: 0.75,
			//		parabolicGravity: 16.5,
			//		facing: 1,
			//	});
		});

		skillshot.fire(skillshotTargetPosition);
		castVars.missile = skillshot;
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new TempYasuoRMissile();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
