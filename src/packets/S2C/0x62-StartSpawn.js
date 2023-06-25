const BasePacket = require('../BasePacket');

module.exports = class StartSpawn extends BasePacket {
	static struct = {
		botCountOrder: 'uint8',
		botCountChaos: 'uint8',
	}
};
