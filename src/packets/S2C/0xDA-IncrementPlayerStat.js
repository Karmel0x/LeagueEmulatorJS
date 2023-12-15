import BasePacket from '../BasePacket.js';

export default class IncrementPlayerStat extends BasePacket {
	static struct = {
		playerNetId: 'uint32',
		statEvent: 'uint8',
	};
}
