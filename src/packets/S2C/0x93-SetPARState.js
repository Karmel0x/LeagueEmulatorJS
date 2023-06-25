const BasePacket = require('../BasePacket');


module.exports = class SetPARState extends BasePacket {
	static struct = {
		unitNetId: 'uint32',
		PARState: 'uint32',
	}
};
