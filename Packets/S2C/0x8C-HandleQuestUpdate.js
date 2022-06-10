const BasePacket = require('../BasePacket');

module.exports = class HandleQuestUpdate extends BasePacket {
	static struct = {
		objective: ['char', 128],
		icon: ['char', 128],
		tooltip: ['char', 128],
		reward: ['char', 128],
		questType: 'uint8',
		questCommand: 'uint8',
		bitfield: ['bitfield', {
			handleRollovers: 1,
			ceremony: 2,
			success: 4,
		}],
		questId: 'uint32',
	}
};
