var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			StartFromCurrentPosition: 1,
			UnlockCamera: 2,
		}],
		StartPosition: Vector3,
		TargetPosition: Vector3,
		TravelTime: 'float',
	}
};
