var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		MusicCommand: 'uint8',
		MusicEventAudioEventID: 'uint32',
		MusicParamAudioEventID: 'uint32',
	}
};
