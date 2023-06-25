const BasePacket = require('../BasePacket');


module.exports = class OnQuestEvent extends BasePacket {
	static struct = {
		questEvent: 'uint8',
		questId: 'uint32',
	}
};
