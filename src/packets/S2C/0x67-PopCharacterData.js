import BasePacket from '../BasePacket.js';

export default class PopCharacterData extends BasePacket {
	static struct = {
		popId: 'uint32',
	};
}
