import BasePacket from '../BasePacket.js';

export default class OnRespawnPointEvent extends BasePacket {
	static struct = {
		respawnPointEvent: 'uint8',
		respawnPointUiId: 'uint8',
	};
}
