
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import HashString from '@workspace/packets/packages/packets/functions/hash-string';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';


export default class EzrealTrueshotBarrage extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.R;

	castRange = 25000;

	castInfo = {
		//spellSlot: 45,
		designerCastTime: 1,
		designerTotalTime: 1,
	};

	preCast(spellData) {
		spellData.maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: spellData.maxRangePosition,
			stats: {
				radius: 160,
				range: 25000,
				speed: 2000,
			},
		});


		let collidedWith: number[] = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: 160,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.combat.attack(target);
			},
		};

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('Ezreal_bow_huge.troy'), HashString.HashString('L_HAND'));

		this.fireMissile(spellData.missile);
	}

	async fireMissile(missile) {

		let windup = 1;//?
		await Promise.delay(windup * 1000);
		missile.fire(missile.target);

		await Promise.delay(windup * 1000 / 2);
	}
}
