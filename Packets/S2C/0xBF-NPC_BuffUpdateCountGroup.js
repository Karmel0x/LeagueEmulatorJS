var BasePacket = require('../BasePacket');


var BuffUpdateCountGroupEntry = {
    OwnerNetId: 'uint32',
    CasterNetId: 'uint32',
    BuffSlot: 'uint8',
    Count: 'uint8',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		Duration: 'float',
		RunningTime: 'float',
		count: 'uint8',
		Entries: [BuffUpdateCountGroupEntry, 'count'],
	}
};
