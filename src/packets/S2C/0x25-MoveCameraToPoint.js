const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');


module.exports = class MoveCameraToPoint extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			startFromCurrentPosition: 1,
			unlockCamera: 2,
		}],
		startPosition: SVector3,
		targetPosition: SVector3,
		travelTime: 'float',
	}
};
