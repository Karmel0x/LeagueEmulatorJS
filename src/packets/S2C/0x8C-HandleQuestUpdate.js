const BasePacket = require('../BasePacket');


/**
 * shows blue quest list box on right of the screen
 * max 3 quests per type
 */
module.exports = class HandleQuestUpdate extends BasePacket {
	static types = {
		PRIMARY_QUEST: 0,
		SECONDARY_QUEST: 1,
		OBJECTIVE: 2,
		NUM_QUEST_TYPES: 3,
	}
	static commands = {
		ACTIVATE_QUEST: 0,
		COMPLETE_QUEST: 1,
		REMOVE_QUEST: 2,
	}
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
