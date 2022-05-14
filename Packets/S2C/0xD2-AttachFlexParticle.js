var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetId: 'uint32',
		ParticleFlexID: 'uint8',
		CpIndex: 'uint8',
		ParticleAttachType: 'uint32',
	}
};
