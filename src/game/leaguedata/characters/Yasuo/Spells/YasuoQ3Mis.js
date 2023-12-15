
import slotId from '../../../../../constants/slotId.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';
import package1 from '../package.js';


export default class YasuoQ3Mis extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qm;
	windup = 0.35;
	isProjectile = true;

	castInfo = {
		designerCastTime: 0.1,
		designerTotalTime: 1,
		bitfield: {
			isForceCastingOrChannel: true,
		},
		ammoUsed: 0,
		target: [],
	};

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
}
