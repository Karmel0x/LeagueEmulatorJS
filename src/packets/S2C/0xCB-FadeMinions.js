const BasePacket = require('../BasePacket');


module.exports = class FadeMinions extends BasePacket {
	static struct = {
		team: 'uint8',
		fadeAmount: 'float',
		fadeTime: 'float',
	}
};
