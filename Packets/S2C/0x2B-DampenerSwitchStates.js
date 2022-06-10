const BasePacket = require('../BasePacket');


module.exports = class DampenerSwitchStates extends BasePacket {
	static struct = {
		state: 'uint8',
		duration: 'uint16',
	}
};
