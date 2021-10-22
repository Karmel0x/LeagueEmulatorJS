var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		Objective: 'string0',
		Icon: 'string0',
		Tooltip: 'string0',
		Reward: 'string0',
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
