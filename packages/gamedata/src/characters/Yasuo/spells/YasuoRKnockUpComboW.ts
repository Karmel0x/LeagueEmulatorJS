
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';
import YasuoRDummySpell from './YasuoRDummySpell';
import * as Measure from '@repo/gameserver/src/gameobjects/extensions/measure';


export default class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	static childSpellList = [
		YasuoRDummySpell,
	];

	collidedWith = [];
	onCast(spellData: SpellData) {
		if (!spellData.targetPosition)
			return;

		super.onCast(spellData);

		spellData.spellChain.anglePosition = Measure.general.anglePosition(spellData.targetPosition, this.owner);
	}
}
