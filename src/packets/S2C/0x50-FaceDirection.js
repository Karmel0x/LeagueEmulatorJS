const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');


module.exports = class FaceDirection extends BasePacket {
	static struct = {
		flags: ['bitfield', {
			doLerpTime: 1,
		}],
		direction: SVector3,
		lerpTime: 'float',
	}
};
