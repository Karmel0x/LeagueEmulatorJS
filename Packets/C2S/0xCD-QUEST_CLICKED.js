var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//C2S.
	struct = {
		QuestEvent: 'uint8',
		QuestID: 'uint32',
	}
};
