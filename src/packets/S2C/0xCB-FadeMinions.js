const BasePacket = require('../BasePacket');


module.exports = class FadeMinions extends BasePacket {
	static struct = {
		teamId: 'uint8',
		fadeAmount: 'float',
		fadeTime: 'float',
	}
};
