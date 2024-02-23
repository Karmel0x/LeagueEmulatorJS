
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell from '@workspace/gameserver/src/game/datamethods/spells/_Spell';

import package1 from '../package';


export default class EzrealEssenceFluxMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Qq;

	isProjectile = true;

	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

}
