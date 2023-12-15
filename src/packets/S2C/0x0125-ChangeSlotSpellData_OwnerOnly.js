import ExtendedPacket from '../ExtendedPacket.js';
import ChangeSlotSpellData from './0x17-ChangeSlotSpellData.js';


export default class ChangeSlotSpellData_OwnerOnly extends ChangeSlotSpellData {
	static struct_header = ExtendedPacket.struct_header;

}
