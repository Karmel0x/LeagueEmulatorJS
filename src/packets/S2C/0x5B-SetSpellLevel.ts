import BasePacket from '../BasePacket';

export default class SetSpellLevel extends BasePacket {
	static struct = {
		spellSlot: 'int32',
		spellLevel: 'int32',
	};
}
