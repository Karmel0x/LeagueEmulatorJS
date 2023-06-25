const BasePacket = require('../BasePacket');


module.exports = class AI_Target extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
