var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		NetID: 'uint32',
		ParticleFlexID: 'uint8',
		CpIndex: 'uint8',
		ParticleAttachType: 'uint32',
	}
};
