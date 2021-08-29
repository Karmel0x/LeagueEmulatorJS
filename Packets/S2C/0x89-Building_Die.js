var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.Building_Die
	struct = {
		AttackerNetID: 'uint32',
		LastHeroNetID: 'uint32',
	}
};
