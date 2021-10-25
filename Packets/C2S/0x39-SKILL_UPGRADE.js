var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.SKILL_UPGRADE
	struct = {
		Slot: 'uint8',
		bitfield_IsEvolve: 'uint8',
	}
};
