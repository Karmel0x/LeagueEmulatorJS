const ExtendedPacket = require('../ExtendedPacket');


module.exports = class IncrementMinionKills extends ExtendedPacket {
	static struct = {
		playerNetId: 'uint32',
	}
};
