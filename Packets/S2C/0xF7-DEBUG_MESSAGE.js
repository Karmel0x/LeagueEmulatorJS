var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.DEBUG_MESSAGE
	struct = {
		SourceNetId: 'uint32',
		Message: 'string0',//512
	}
};
