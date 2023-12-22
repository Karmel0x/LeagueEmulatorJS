import BasePacket from '../BasePacket';

export default class OnRespawnPointEvent extends BasePacket {
	static struct = {
		respawnPointEvent: 'uint8',
		respawnPointUiId: 'uint8',
	};
}
