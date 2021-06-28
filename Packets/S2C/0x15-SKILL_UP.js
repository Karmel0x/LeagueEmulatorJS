var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.SKILL_UP
	struct = {
		Slot: 'uint8',
		SpellLevel: 'uint8',
		SkillPoints: 'uint8',
	}
};
