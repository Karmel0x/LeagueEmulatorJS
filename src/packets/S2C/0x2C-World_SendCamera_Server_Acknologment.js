import BasePacket from '../BasePacket.js';

export default class World_SendCamera_Server_Acknologment extends BasePacket {
	static struct = {
		syncId: 'uint8',
	};
}
