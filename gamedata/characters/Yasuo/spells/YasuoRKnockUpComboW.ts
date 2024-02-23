
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';
import YasuoRDummySpell from './YasuoRDummySpell';
import * as Measure from '@workspace/gameserver/src/gameobjects/extensions/measure';


export default class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	static childSpellList = [
		YasuoRDummySpell,
	];

	collidedWith = [];
	onCast(spellData) {
		super.onCast(spellData);

		spellData.anglePosition = Measure.general.anglePosition(spellData.packet, this.owner);
	}
}
