
import PositionHelper from '../../../../../gameobjects/extensions/Measure/index';
import _Spell from '../../../../datamethods/spells/_Spell';
import YasuoRDummySpell from './YasuoRDummySpell';


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
