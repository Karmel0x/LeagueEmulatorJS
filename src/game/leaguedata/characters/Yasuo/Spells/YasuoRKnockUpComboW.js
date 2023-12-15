
import PositionHelper from '../../../../../gameobjects/extensions/Measure/index.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';
import YasuoRDummySpell from './YasuoRDummySpell.js';


export default class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	static childSpellList = [
		YasuoRDummySpell,
	];

	collidedWith = [];
	onCast(spellData) {
		super.onCast(spellData);

		spellData.anglePosition = PositionHelper.anglePosition(spellData.packet, this.owner);
	}
}
