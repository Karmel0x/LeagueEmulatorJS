const BasePacket = require('../BasePacket');


module.exports = class DampenerSwitchStates extends BasePacket {
	static states = {
		DEAD: 0,
		ALIVE: 1,
	}

	static struct = {
		state: 'uint8',
		duration: 'uint16',
	}
};
