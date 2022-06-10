const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');

module.exports = class SetCircularMovementRestriction extends BasePacket {
	static struct = {
		center: SVector3,
		radius: 'float',
		bitfield: ['bitfield', {
			restrictCamera: 1,
		}],
	}
};
