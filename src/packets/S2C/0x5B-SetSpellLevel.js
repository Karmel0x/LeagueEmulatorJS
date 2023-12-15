import BasePacket from '../BasePacket.js';

export default class SetSpellLevel extends BasePacket {
	static struct = {
		spellSlot: 'int32',
		spellLevel: 'int32',
	};
}
