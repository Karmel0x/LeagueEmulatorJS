const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');


module.exports = class CameraBehavior extends BasePacket {
	static struct = {
		position: SVector3,
	}
};
