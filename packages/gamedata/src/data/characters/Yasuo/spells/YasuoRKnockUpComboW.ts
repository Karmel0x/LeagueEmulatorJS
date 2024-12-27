
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';
import { SpellCast } from '@repo/gameserver/src/game/scripting/spell-cast';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import { Vector2 } from '@repo/geometry';
import YasuoRDummySpell from './YasuoRDummySpell';


export default class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	static childSpellList = [
		YasuoRDummySpell,
	];

	collidedWith = [];
	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		if (!castData.targetPosition)
			return;

		const targetPosition = new Vector2(castData.targetPosition.x, castData.targetPosition.y);
		spellVars.anglePosition = Measure.general.anglePosition(targetPosition, owner);
	}

	async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {
		const Spell = YasuoRDummySpell;
		const spell = new Spell();
		spell.name = Spell.name;
		const spellCast = new SpellCast(spell, owner, castData);
		await spellCast.castSpell(spellVars);
	}

}
