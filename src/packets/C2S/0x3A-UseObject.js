const BasePacket = require('../BasePacket');


module.exports = class UseObject extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
