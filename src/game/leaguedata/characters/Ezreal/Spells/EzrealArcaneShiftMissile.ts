
import slotId from '../../../../../constants/slotId';
import _Spell from '../../../../datamethods/spells/_Spell';

import package1 from '../package';


export default class EzrealArcaneShiftMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;

	isProjectile = true;

	onCast(spellData) {

	}
}
