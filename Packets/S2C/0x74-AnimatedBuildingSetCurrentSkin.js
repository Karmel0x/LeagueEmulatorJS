const BasePacket = require('../BasePacket');

module.exports = class AnimatedBuildingSetCurrentSkin extends BasePacket {
	static struct = {
		teamId: 'uint8',
		skinId: 'uint32',
	}
};
