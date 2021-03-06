const BasePacket = require('../BasePacket');

module.exports = class PlayVOAudioEvent extends BasePacket {
	static struct = {
		folderName: ['char', 64],
		eventId: ['char', 64],
		audioCallbackType: 'uint8',
		audioVOEventType: 'uint8',
		audioEventNetId: 'uint32',
	}
};
