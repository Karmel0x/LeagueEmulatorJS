const BasePacket = require('../BasePacket');
const SVector2 = require('../sharedstruct/SVector2');


module.exports = class MoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
		position: SVector2,
	}
};
