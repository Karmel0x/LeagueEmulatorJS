const BasePacket = require('../BasePacket');

module.exports = class CancelTargetingReticle extends BasePacket {
	static struct = {
		spellSlot: 'uint8',
		bitfield: ['bitfield', {
			resetSpecified: 1,
		}],
	}
};
