
import * as Measure from '@repo/gameserver/src/gameobjectextensions/measure';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import { SpellCast, type CastVars } from '@repo/scripting/load/spell-cast';
import YasuoRDummySpell from './YasuoRDummySpell';


export default class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	collidedWith = [];
	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		if (!castData.targetPosition)
			return;

		const targetPosition = new Vector2(castData.targetPosition.x, castData.targetPosition.y);
		castVars.anglePosition = Measure.general.anglePosition(targetPosition, owner);
	}

	async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		const spell1 = new YasuoRDummySpell();
		const spellCast = new SpellCast(spell1, owner, castData);
		spellCast.castVars = castVars;
		await spellCast.castSpell();
	}

}
