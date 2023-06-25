const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');


module.exports = class CameraBehavior extends BasePacket {
	static struct = {
		position: SVector3,
	}
};
