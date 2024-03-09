
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';
import package1 from '../package';
import YasuoQ3 from './YasuoQ3';
import { SCastInfoModel } from '@workspace/packets/packages/packets/shared/SCastInfo';


export default class YasuoQ3W extends _Spell {

	static childSpellList = [
		YasuoQ3,
	];

	packageHash = package1.packageHash;
	spellSlot = SlotId.Q;
	windup = 0;
	cooldown = 0;//5;
	manaCost = 0;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0,
		designerTotalTime: 1.45,
	};

	castRange = 1150;

	async preCast(spellData: SpellData) {
		if (this.owner.combat.castingSpell)
			throw new Error('No combat casting spell');

		if (this.owner.buffs.hasBuff("YasuoQ") || this.owner.buffs.hasBuff("YasuoQ2"))
			throw new Error('Has upgrade spell buff');

		return await super.preCast(spellData);
	}

	onCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			return;

		//this.position = Measure.centerToCenter.getPositionBetweenRange(this.owner, spellData.targetPosition, this.castRange);
		spellData.spellChain.anglePosition = Measure.general.anglePosition(spellData.targetPosition, this.owner);
		//spellData.target = Dummytarget({position: spellData.targetPosition});

	}
}
