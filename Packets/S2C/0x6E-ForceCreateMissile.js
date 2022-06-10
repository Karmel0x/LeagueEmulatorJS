const BasePacket = require('../BasePacket');


module.exports = class ForceCreateMissile extends BasePacket {
	static struct = {
		missileNetId: 'uint32',
	}
};
