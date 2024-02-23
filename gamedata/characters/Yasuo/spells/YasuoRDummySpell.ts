
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import TempYasuoRMissile from './TempYasuoRMissile';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';


export default class YasuoRDummySpell extends _Spell {

	spellSlot = SlotId.Qm;

	castInfo = {
		designerCastTime: -1,
		designerTotalTime: 0.7,
	};

	static childSpellList = [
		TempYasuoRMissile,
	];

	onCast(spellData) {

		spellData.spellCast._CastInfo.targets = [{
			unit: this.owner.netId,
			hitResult: 1,
		}];

		let skillshotTargetPosition = spellData.anglePosition.add(this.owner.position);

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
		skillshot.callbacks.collision._ = {
			options: {
				range: 90,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target))
					return;

				collidedWith.push(target);

				skillshot.owner.combat.attack(target);
				//if(target.moving.knockUp)
				//	target.moving.knockUp({
				//		duration: 0.75,
				//		parabolicGravity: 16.5,
				//		facing: 1,
				//	});
			},
		};
		this.collidedWith = collidedWith;

		spellData.missile = skillshot;
	}
}
