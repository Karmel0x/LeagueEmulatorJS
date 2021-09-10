var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//C2S.UNDOITEMREQ
	struct = {
		unk: ['uint8'],
	}
};
