var BasePacket = require('../BasePacket');

var BuffRemoveGroupEntry = {
    OwnerNetID: 'uint32',
    Slot: 'uint8',
    RunTimeRemove: 'float',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffNameHash: 'uint32',
		count: 'uint8',
		Entries: [BuffRemoveGroupEntry, 'count'],
	}
};
