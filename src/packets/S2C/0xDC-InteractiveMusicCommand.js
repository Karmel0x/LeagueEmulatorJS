const BasePacket = require('../BasePacket');


module.exports = class InteractiveMusicCommand extends BasePacket {
	static struct = {
		musicCommand: 'uint8',
		musicEventAudioEventId: 'uint32',
		musicParamAudioEventId: 'uint32',
	}
};
