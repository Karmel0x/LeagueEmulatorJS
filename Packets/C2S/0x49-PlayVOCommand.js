var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		CommandID: 'uint32',
		TargetNetId: 'uint32',
		EventHash: 'uint32',
		bitfield: ['bitfield', {
			HighlightPlayerIcon: 1,
			FromPing: 2,
			AlliesOnly: 4,
		}],
	}
};
