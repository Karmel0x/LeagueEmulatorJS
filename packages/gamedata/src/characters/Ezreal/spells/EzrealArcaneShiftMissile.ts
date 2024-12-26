
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { SpellData } from '@repo/gameserver/src/game/basedata/spells/spell';

import package1 from '../package';


export default class EzrealArcaneShiftMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.Qq;

	isProjectile = true;

	onCast(spellData: SpellData) {

	}
}
