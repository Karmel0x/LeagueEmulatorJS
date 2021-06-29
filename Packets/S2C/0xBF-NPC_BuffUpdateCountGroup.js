var BasePacket = require('../BasePacket');


var BuffUpdateCountGroupEntry = {
    OwnerNetID: 'uint32',
    CasterNetID: 'uint32',
    BuffSlot: 'uint8',
    Count: 'uint8',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		Duration: 'float',
		RunningTime: 'float',
		count: 'uint8',
		RunningTime: [BuffUpdateCountGroupEntry, 'count'],
	}
};
