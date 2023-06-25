const BasePacket = require('../BasePacket');

module.exports = class World_SendCamera_Server_Acknologment extends BasePacket {
	static struct = {
		syncId: 'uint8',
	}
};
