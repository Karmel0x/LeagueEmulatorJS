const BasePacket = require('../BasePacket');

module.exports = class AttachFlexParticle extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		particleFlexId: 'uint8',
		cpIndex: 'uint8',
		particleAttachType: 'uint32',
	}
};
