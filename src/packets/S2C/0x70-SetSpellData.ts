import BasePacket from '../BasePacket';

export default class SetSpellData extends BasePacket {
	static struct = {
		objectNetId: 'uint32',
		hashedSpellName: 'uint32',
		spellSlot: 'uint8',
	};
}
