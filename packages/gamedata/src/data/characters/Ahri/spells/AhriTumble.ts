
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Spell from '@repo/scripting/base/spell';
import package1 from '../package';


export default class AhriTumble extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = SlotId.es8;

}
