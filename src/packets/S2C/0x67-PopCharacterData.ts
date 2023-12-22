import BasePacket from '../BasePacket';

export default class PopCharacterData extends BasePacket {
	static struct = {
		popId: 'uint32',
	};
}
