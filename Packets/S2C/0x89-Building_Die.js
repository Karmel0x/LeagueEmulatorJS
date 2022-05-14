var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.Building_Die
	struct = {
		AttackerNetId: 'uint32',
		LastHeroNetId: 'uint32',
	}
};
