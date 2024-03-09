
import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';
import TempYasuoRMissile from './TempYasuoRMissile';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import { IDefendable } from '@workspace/gameserver/src/gameobjects/extensions/combat/defendable';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';


export default class YasuoRDummySpell extends _Spell {

	spellSlot = SlotId.Qm;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: -1,
		designerTotalTime: 0.7,
	};

	static childSpellList = [
		TempYasuoRMissile,
	];

	onCast(spellData: SpellData) {
		if (!spellData.spellCast)
			return false;
		if (!spellData.spellChain.anglePosition)
			return false;

		spellData.spellCast._CastInfo.targets = [{
			unit: this.owner.netId,
			hitResult: 1,
		}];

		let skillshotTargetPosition = spellData.spellChain.anglePosition.add(this.owner.position);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: skillshotTargetPosition,
			stats: {
				radius: 90,
				range: 1150,
				speed: 1200,
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

				//if(target.moving.knockUp)
				//	target.moving.knockUp({
				//		duration: 0.75,
				//		parabolicGravity: 16.5,
				//		facing: 1,
				//	});
			}
		});

		spellData.spellChain.missile = skillshot;
	}
}
