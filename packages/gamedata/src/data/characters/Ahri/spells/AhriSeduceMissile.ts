
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell from '@repo/scripting/base/spell';
import package1 from '../package';


export default class AhriSeduceMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.es6;
	isMissile = true;

}
