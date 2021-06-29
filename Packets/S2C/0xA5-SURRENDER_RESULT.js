var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		SurrenderReason: 'uint32',
		ForVote: 'uint8',
		AgainstVote: 'uint8',
		TeamID: 'uint32',
	}
};
