const ExtendedPacket = require('../ExtendedPacket');
const ChangeSlotSpellData = require('./0x17-ChangeSlotSpellData');


module.exports = class ChangeSlotSpellData_OwnerOnly extends ChangeSlotSpellData {
	static struct_header = ExtendedPacket.struct_header;

};
