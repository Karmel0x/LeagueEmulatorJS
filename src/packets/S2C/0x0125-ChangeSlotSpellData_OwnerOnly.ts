import ExtendedPacket from '../ExtendedPacket';
import ChangeSlotSpellData from './0x17-ChangeSlotSpellData';


export default class ChangeSlotSpellData_OwnerOnly extends ChangeSlotSpellData {
	static struct_header = ExtendedPacket.struct_header;

}
