const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class Pause extends BasePacket {
	static struct = {
		position: SVector3,
		forward: SVector3,
		syncId: 'int32',
	}
};
