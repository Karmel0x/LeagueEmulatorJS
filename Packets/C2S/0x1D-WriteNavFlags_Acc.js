const BasePacket = require('../BasePacket');


module.exports = class WriteNavFlags_Acc extends BasePacket {
	static struct = {
		syncId: 'int32',
	}
};
