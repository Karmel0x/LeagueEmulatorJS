const BasePacket = require('../BasePacket');


module.exports = class OnReplication_Acc extends BasePacket {
	static struct = {
		syncId: 'uint32',
	}
};
