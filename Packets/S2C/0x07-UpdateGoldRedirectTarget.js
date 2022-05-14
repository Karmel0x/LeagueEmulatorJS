var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.UpdateGoldRedirectTarget
	struct = {
		TargetNetId: 'uint32',
	}
};
