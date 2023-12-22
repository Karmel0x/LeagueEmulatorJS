
import Skillshot from '../../../../../gameobjects/missiles/Skillshot';
import _Spell from '../../../../datamethods/spells/_Spell';
import PositionHelper from '../../../../../gameobjects/extensions/Measure/index';
import HashString from '../../../../../functions/HashString';

import package1 from '../package';
import slotId from '../../../../../constants/slotId';


export default class EzrealTrueshotBarrage extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.R;

	castRange = 25000;

	castInfo = {
		//spellSlot: 45,
		designerCastTime: 1,
		designerTotalTime: 1,
	};

	preCast(spellData) {
		spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 2000, range: 25000, radius: 160
		});

		let collidedWith: number[] = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: skillshot.options.radius,
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
		await Promise.wait(windup * 1000);
		missile.fire(missile.target);

		await Promise.wait(windup * 1000 / 2);
	}
}
