const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');


module.exports = class FaceDirection extends BasePacket {
	static struct = {
		flags: ['bitfield', {
			doLerpTime: 1,
		}],
		direction: SVector3,
		lerpTime: 'float',
	}
};
