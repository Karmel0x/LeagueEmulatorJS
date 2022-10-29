const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');


/**
 * restrict movement
 * may be usefull to prevent leaving specific area
 * ex. prevent leaving spawn or new mordekaiser ult
 */
module.exports = class SetCircularMovementRestriction extends BasePacket {
	static struct = {
		center: SVector3,
		radius: 'float',
		bitfield: ['bitfield', {
			restrictCamera: 1,
		}],
	}
};
