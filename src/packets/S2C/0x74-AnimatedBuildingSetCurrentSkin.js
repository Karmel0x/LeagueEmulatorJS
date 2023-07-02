const BasePacket = require('../BasePacket');

module.exports = class AnimatedBuildingSetCurrentSkin extends BasePacket {
	static struct = {
		team: 'uint8',
		skinId: 'uint32',
	}
};
