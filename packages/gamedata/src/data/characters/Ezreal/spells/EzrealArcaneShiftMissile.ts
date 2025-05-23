
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell, { type CastData } from '@repo/gameserver/src/game/basedata/spell';

import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import package1 from '../package';


export default class EzrealArcaneShiftMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.es2;

	isMissile = true;

	onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

	}
}
