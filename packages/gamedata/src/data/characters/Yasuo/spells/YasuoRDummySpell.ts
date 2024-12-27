
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import { SpellCast } from '@repo/gameserver/src/game/scripting/spell-cast';
import Missile from '@repo/gameserver/src/gameobjects/missiles/missile';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import { DamageSource, DamageType } from '@repo/packets/shared/SDeathData';
import TempYasuoRMissile from './TempYasuoRMissile';


export default class YasuoRDummySpell extends _Spell {

	spellSlot = SlotId.es1;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: -1,
		designerTotalTime: 0.7,
	};

	static childSpellList = [
		TempYasuoRMissile,
	];

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		if (!spellVars.anglePosition)
			return false;

		spellVars._CastInfo.targets = [{
			unitNetId: owner.netId,
			hitResult: 1,
		}];

		let skillshotTargetPosition = spellVars.anglePosition.add(owner.position);

		let skillshot = Missile.initialize({
			spawner: owner,
			stats: {
				radius: 90,
				range: 1150,
				speed: 1200,
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

			//if(target.moving.knockUp)
			//	target.moving.knockUp({
			//		duration: 0.75,
			//		parabolicGravity: 16.5,
			//		facing: 1,
			//	});
		});

		skillshot.fire(skillshotTargetPosition);
		spellVars.missile = skillshot;
	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const Spell = TempYasuoRMissile;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);
	}

}
