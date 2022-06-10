const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');


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
