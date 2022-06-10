const BasePacket = require('../BasePacket');


module.exports = class InteractiveMusicCommand extends BasePacket {
	static struct = {
		musicCommand: 'uint8',
		musicEventAudioEventID: 'uint32',
		musicParamAudioEventID: 'uint32',
	}
};
