var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.DEBUG_MESSAGE
	struct = {
		SourceNetID: 'uint32',
		Message: 'string0',//512
	}
};
