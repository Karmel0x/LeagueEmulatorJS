const BasePacket = require('../BasePacket');

module.exports = class UpgradeSpellAns extends BasePacket {
	static struct = {
		slot: 'uint8',
		spellLevel: 'uint8',
		skillPoints: 'uint8',
	}
};
