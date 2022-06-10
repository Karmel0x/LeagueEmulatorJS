const BasePacket = require('../BasePacket');
const SVector3 = require('../SharedStruct/SVector3');

module.exports = class Pause extends BasePacket {
	static struct = {
		position: SVector3,
		forward: SVector3,
		syncId: 'int32',
	}
};
