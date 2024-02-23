
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import YasuoQ3 from './YasuoQ3';


export default class YasuoQ3W extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Q;
	windup = 0;
	cooldown = 0;//5;
	manaCost = 0;

	castInfo = {
		target: [],
		designerCastTime: 0,
		designerTotalTime: 1.45,
	};

	static childSpellList = [
		YasuoQ3,
	];

	castRange = 1150;
	preCast(spellData) {
		if (this.owner.combat.castingSpell)
			return false;

		if (this.owner.buffs.hasBuff("YasuoQ") || this.owner.buffs.hasBuff("YasuoQ2"))
			return false;

		return super.preCast(spellData);
	}

	onCast(spellData) {
		//spellData.position = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);
		spellData.anglePosition = Measure.general.anglePosition(spellData.packet, this.owner);
		//spellData.target = Dummytarget({position: spellData.packet.position});

	}
}
