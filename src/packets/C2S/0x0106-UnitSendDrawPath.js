const ExtendedPacket = require('../ExtendedPacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class UnitSendDrawPath extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathNodeType: 'uint8',
		point: SVector3,
	}
};
