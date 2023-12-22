
import slotId from '../../../../../constants/slotId';
import _Spell from '../../../../datamethods/spells/_Spell';

import package1 from '../package';


export default class EzrealEssenceFluxMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;

	isProjectile = true;

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

}
