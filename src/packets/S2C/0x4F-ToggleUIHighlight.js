const BasePacket = require('../BasePacket');

module.exports = class ToggleUIHighlight extends BasePacket {
	static struct = {
		elementId: 'uint8',
		elementType: 'uint8',
		elementNumber: 'uint8',
		elementSubCategory: 'uint8',
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	}
};
