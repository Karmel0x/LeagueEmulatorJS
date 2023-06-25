const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

/**
 * Activate Monster Camp
 */
module.exports = class ActivateMinionCamp extends BasePacket {
	static struct = {
		position: SVector3,
		spawnDuration: 'float',
		campIndex: 'uint8',
		timerType: 'int32',
	}
};
