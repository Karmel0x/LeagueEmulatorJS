import BasePacket from '../BasePacket.js';

export default class PlaySound extends BasePacket {
	static struct = {
		soundName: ['char', 1024],
		ownerNetId: 'uint32',
	};
}
