
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';
import package1 from '../package';
import YasuoQ3Mis from './YasuoQ3Mis';
import AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';
import Missile from '@workspace/gameserver/src/gameobjects/missiles/missile';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';


export default class YasuoQ3 extends _Spell {

	static childSpellList = [
		YasuoQ3Mis,
	];

	packageHash = package1.packageHash;
	spellSlot = SlotId.Qq;
	windup = 0;

	castInfo: Partial<SCastInfoModel> = {
		designerCastTime: 0.35,
		designerTotalTime: 0.5,
		isOverrideCastPosition: true,

		// facing is not working without these two ??
		spellSlot: 0,
		targets: [],
		//spellSlot: 46,// <- original packet
		//targets: [{ unit: this.owner.netId, hitResult: 0 }],// <- original packet

	};

	onCast(spellData: SpellData) {
		if (!spellData.spellChain.anglePosition)
			return;

		super.onCast(spellData);

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
			if (!(target instanceof AttackableUnit))
				return;

			if (!target.combat)
				return;

			if (this.owner == target || collidedWith.includes(target.netId))
				return;

			collidedWith.push(target.netId);

			if (this.owner.combat) {
				this.owner.combat.attack(target);

				if (target.moving) {
					target.moving.knockUp({
						duration: 0.75,
						parabolicGravity: 16.5,
						facing: true,
					});
				}
			}
		});

		spellData.spellChain.missile = skillshot;
	}
}
