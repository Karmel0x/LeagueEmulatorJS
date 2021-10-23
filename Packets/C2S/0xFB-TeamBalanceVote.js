var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.
	struct = {
		bitfield_VoteYes: 'uint8',
	}
};
