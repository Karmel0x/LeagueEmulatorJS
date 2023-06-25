const BasePacket = require('../BasePacket');


module.exports = class SendSelectedObjId extends BasePacket {
	static struct = {
		clientId: 'int32',
		selectedNetId: 'uint32',
	}
};
