import BasePacket from '../BasePacket.js';

export default class StartSpawn extends BasePacket {
	static struct = {
		botCountOrder: 'uint8',
		botCountChaos: 'uint8',
	};
}
