const BasePacket = require('../BasePacket');
var SVector2 = require('../SharedStruct/SVector2');


module.exports = class MoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
		position: SVector2,
	}
};
