
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import package1 from '../package';
import YasuoQ3Mis from './YasuoQ3Mis';
import { IDefendable } from '@workspace/gameserver/src/gameobjects/extensions/combat/defendable';
import { IMovingUnit } from '@workspace/gameserver/src/gameobjects/extensions/traits/moving-unit';


export default class YasuoQ3 extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Qq;
	windup = 0;

	castInfo = {
		designerCastTime: 0.35,
		designerTotalTime: 0.5,
		bitfield: {
			isOverrideCastPosition: true,
		},

		// facing is not working without these two ??
		spellSlot: 0,
		target: [],
		//spellSlot: 46,// <- original packet
		//target: [{ unit: this.owner.netId, hitResult: 0 }],// <- original packet

	};

	static childSpellList = [
		YasuoQ3Mis,
	];

	onCast(spellData) {
		super.onCast(spellData);

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
			function: (target: IDefendable) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.combat.attack(target);
				if ((target as unknown as IMovingUnit).moving)
					(target as unknown as IMovingUnit).moving.knockUp({
						duration: 0.75,
						parabolicGravity: 16.5,
						facing: 1,
					});
			},
		};
		spellData.missile = skillshot;

	}
}
