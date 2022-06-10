const BasePacket = require('../BasePacket');
const SVector3 = require('../SharedStruct/SVector3');

module.exports = class ChangeMissileTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		targetPosition: SVector3,
	}
};
