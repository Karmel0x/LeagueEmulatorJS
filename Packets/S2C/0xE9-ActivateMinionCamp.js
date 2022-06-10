const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');

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
