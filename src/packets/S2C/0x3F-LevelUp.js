const BasePacket = require('../BasePacket');


module.exports = class LevelUp extends BasePacket {
	static struct = {
		level: 'uint8',
		aveliablePoints: 'uint8',
	}
};
