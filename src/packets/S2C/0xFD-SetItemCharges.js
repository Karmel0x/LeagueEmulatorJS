const BasePacket = require('../BasePacket');


module.exports = class SetItemCharges extends BasePacket {
	static struct = {
		slot: 'uint8',
		spellCharges: 'uint8',
	}
};
