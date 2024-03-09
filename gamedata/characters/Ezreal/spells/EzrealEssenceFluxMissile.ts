
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Spell, { SpellData } from '@workspace/gameserver/src/game/basedata/spells/spell';

import package1 from '../package';


export default class EzrealEssenceFluxMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Qq;

	isProjectile = true;

	onCast(spellData: SpellData) {
		const missile = spellData.spellChain.missile;
		if (!missile) return;

		//console.log(missile);
		missile.fire(missile.target);
	}

}
