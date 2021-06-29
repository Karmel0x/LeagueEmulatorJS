var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		AttackerNetID: 'uint32',
		LastHeroNetID: 'uint32',
	}
};
