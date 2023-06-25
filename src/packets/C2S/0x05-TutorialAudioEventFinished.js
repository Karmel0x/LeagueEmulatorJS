const BasePacket = require('../BasePacket');

module.exports = class TutorialAudioEventFinished extends BasePacket {
	static struct = {
		audioEventNetId: 'uint32',
	}
};
