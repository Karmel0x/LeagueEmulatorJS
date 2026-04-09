
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import type { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';
import YasuoQ3Mis from './YasuoQ3Mis';


export default class YasuoQ3 extends _Spell {

	packageHash = package1.packageHash;
	spellSlot = SlotId.es2;
	windup = 0;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: 0.35,
		designerTotalTime: 0.5,
		isOverrideCastPosition: true,

		// facing is not working without these two ??
		spellSlot: 0,
		targets: [],
		//spellSlot: 46,// <- original packet
		//targets: [{ unitNetId: this.owner.netId, hitResult: 0 }],// <- original packet

	};

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		if (!castVars.anglePosition)
			return;

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
		skillshot.eventEmitter.on('collisionUnit', (target) => {
			if (!(target instanceof AttackableUnit))
				return;

			if (!target.combat)
				return;

			if (owner === target || collidedWith.includes(target.netId))
				return;

			collidedWith.push(target.netId);

			target.combat.damage(owner, {
				damageAmount: 100,
				damageType: DamageType.physical,
				damageSource: DamageSource.spell,
			});

			if (target.moving) {
				target.moving.knockUp({
					duration: 0.75,
					parabolicGravity: 16.5,
					facing: true,
				});
			}
		});

		skillshot.fire(skillshotTargetPosition);
		castVars.missile = skillshot;
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		castData = {
			...castData,
			packet: {
				...castData.packet,
				slot: SlotId.es1,
			},
		};

		const spell1 = new YasuoQ3Mis();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
