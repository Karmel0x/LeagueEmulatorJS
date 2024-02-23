
import HashString from '@workspace/packets/packages/packets/functions/hash-string';
import Skillshot from '@workspace/gameserver/src/gameobjects/missiles/skillshot';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import EzrealMysticShotMissile from './EzrealMysticShotMissile';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';


export default class EzrealMysticShot extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Q;

	castInfo = {
		target: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
		//cooldown: 6,
		//manaCost: 28,
	};

	static childSpellList = [
		EzrealMysticShotMissile,
	];

	preCast(spellData) {
		spellData.maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: spellData.maxRangePosition,
			stats: {
				radius: 60,
				range: 1150,
				speed: 2000,
			},
		});

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}

	onCast(spellData) {
		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('ezreal_bow.troy'), HashString.HashString('L_HAND'));

	}
}
