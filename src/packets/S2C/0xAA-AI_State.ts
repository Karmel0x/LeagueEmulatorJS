import BasePacket from '../BasePacket';

export default class AI_State extends BasePacket {
	static struct = {
		aiState: 'uint32',
	};
}
