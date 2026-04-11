
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell from '@repo/scripting/base/spell';
import package1 from '../package';


export default class AhriOrbReturn extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.es2;
	isMissile = true;

}
