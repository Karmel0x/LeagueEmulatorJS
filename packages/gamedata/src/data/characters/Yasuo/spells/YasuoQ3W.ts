
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import { SpellCast } from '@repo/gameserver/src/game/scripting/spell-cast';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import { SCastInfoModel } from '@repo/packets/shared/SCastInfo';
import package1 from '../package';
import YasuoQ3 from './YasuoQ3';


export default class YasuoQ3W extends _Spell {

	static childSpellList = [
		YasuoQ3,
	];

	packageHash = package1.packageHash;
	spellSlot = SlotId.q;
	windup = 0;
	cooldown = 0;//5;
	manaCost = 0;

	castInfo: Partial<SCastInfoModel> = {
		targets: [],
		designerCastTime: 0,
		designerTotalTime: 1.45,
	};

	castRange = 1150;

	preCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		//if (owner.combat.castingSpell)
		//	throw new Error('No combat casting spell');

		if (owner.buffManager.hasBuff("YasuoQ") || owner.buffManager.hasBuff("YasuoQ2"))
			throw new Error('Has upgrade spell buff');
	}

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const targetPosition = castData.targetPosition;
		if (!targetPosition)
			return;

		const targetPosition2 = new Vector2(targetPosition.x, targetPosition.y);
		//this.position = Measure.centerToCenter.getPositionBetweenRange(owner, castData.targetPosition, this.castRange);
		spellVars.anglePosition = Measure.general.anglePosition(targetPosition2, owner);
		//castData.target = Dummytarget({position: castData.targetPosition});

	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		castData = {
			...castData,
			packet: {
				...castData.packet,
				slot: SlotId.es2,
			},
		};

		const Spell = YasuoQ3;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);
	}

}
