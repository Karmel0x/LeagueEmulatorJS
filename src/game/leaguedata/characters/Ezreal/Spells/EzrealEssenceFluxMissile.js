
import slotId from '../../../../../constants/slotId.js';
import _Spell from '../../../../datamethods/spells/_Spell.js';

import package1 from '../package.js';


export default class EzrealEssenceFluxMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;

	isProjectile = true;

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

}
