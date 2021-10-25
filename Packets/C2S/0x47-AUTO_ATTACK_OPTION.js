var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.AUTO_ATTACK_OPTION
	struct = {
		bitfield_AutoAttackEnabled: 'uint8',
	}
};
