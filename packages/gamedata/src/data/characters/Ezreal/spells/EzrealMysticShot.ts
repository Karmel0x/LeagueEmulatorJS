
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import { SpellCast } from '@repo/gameserver/src/game/scripting/spell-cast';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import HashString from '@repo/packets/functions/hash-string';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
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

	preCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
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

		owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('ezreal_bow.troy'), HashString.HashString('L_HAND'));

	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const Spell = EzrealMysticShotMissile;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);
	}

}
