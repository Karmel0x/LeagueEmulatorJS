const BasePacket = require('../BasePacket');

module.exports = class PlayVOCommand extends BasePacket {
	static struct = {
		commandId: 'uint32',
		targetNetId: 'uint32',
		eventHash: 'uint32',
		bitfield: ['bitfield', {
			highlightPlayerIcon: 1,
			fromPing: 2,
			alliesOnly: 4,
		}],
	}
};
