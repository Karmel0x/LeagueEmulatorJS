var BasePacket = require('../BasePacket');

var Tooltip = {
    OwnerNetId: 'uint32',
    SlotIndex: 'uint8',
    Values: ['float', 16],
    HideFromEnemy: ['uint8', 16],
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		Tooltips_length: 'uint16',
		Tooltips: [Tooltip, 'Tooltips_length'],
	}
};
