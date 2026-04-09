
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Spell, { type CastData } from '@repo/scripting/base/spell';
import type { CastVars } from '@repo/scripting/load/spell-cast';
import package1 from '../package';


export default class EzrealEssenceFluxMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.es2;

	isMissile = true;

	onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {
		//const missile = castVars.missile;
		//if (!missile) return;
		//
		////console.log(missile);
		//missile.fire(missile.target);
	}

}
