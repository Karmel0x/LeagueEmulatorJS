
import HashString from '../../../../../functions/HashString.js';
import PositionHelper from '../../../../../gameobjects/extensions/Measure/index.js';
import Skillshot from '../../../../../gameobjects/missiles/Skillshot.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';
import EzrealMysticShotMissile from './EzrealMysticShotMissile.js';

import package1 from '../package.js';
import slotId from '../../../../../constants/slotId.js';


export default class EzrealMysticShot extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Q;

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
		spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 2000, range: 1150, radius: 60
		});

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}

	onCast(spellData) {
		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('ezreal_bow.troy'), HashString.HashString('L_HAND'));

	}
}
