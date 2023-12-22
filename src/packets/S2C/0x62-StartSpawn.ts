import BasePacket from '../BasePacket';

export default class StartSpawn extends BasePacket {
	static struct = {
		botCountOrder: 'uint8',
		botCountChaos: 'uint8',
	};
}
