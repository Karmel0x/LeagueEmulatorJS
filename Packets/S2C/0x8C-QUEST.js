var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		Objective: ['char', 128],
		Icon: ['char', 128],
		Tooltip: ['char', 128],
		Reward: ['char', 128],
		QuestType: 'uint8',
		QuestCommand: 'uint8',
		bitfield: ['bitfield', {
			HandleRollovers: 1,
			Ceremony: 2,
			Success: 4,
		}],
		QuestID: 'uint32',
	}
};
