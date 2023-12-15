import BasePacket from '../BasePacket.js';

export default class AI_State extends BasePacket {
	static struct = {
		aiState: 'uint32',
	};
}
