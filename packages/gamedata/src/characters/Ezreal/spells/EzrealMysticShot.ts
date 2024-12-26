
import HashString from '@repo/packets/functions/hash-string';
import Skillshot from '@repo/gameserver/src/gameobjects/missiles/skillshot';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import EzrealMysticShotMissile from './EzrealMysticShotMissile';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';


export default class EzrealMysticShot extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Q;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
		//cooldown: 6,
		//manaCost: 28,
	};

	static childSpellList = [
		EzrealMysticShotMissile,
	];

	async preCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			throw new Error('No target position');

		const maxRangePosition = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.targetPosition, this.castRange);

		let skillshot = Skillshot.create({
			spawner: this.owner,
			targetPosition: maxRangePosition,
			stats: {
				radius: 60,
				range: 1150,
				speed: 2000,
			},
		});

		spellData.spellChain.missile = skillshot;
		return await super.preCast(spellData);
	}

	onCast(spellData: SpellData) {
		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('ezreal_bow.troy'), HashString.HashString('L_HAND'));

	}
}
