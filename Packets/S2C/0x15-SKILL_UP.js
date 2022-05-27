var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.SKILL_UP
	struct = {
		Slot: 'uint8',
		spellLevel: 'uint8',
		skillPoints: 'uint8',
	}
};
