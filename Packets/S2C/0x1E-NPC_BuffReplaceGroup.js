var BasePacket = require('../BasePacket');

const BuffInGroupReplace = {
	OwnerNetId: 'uint32',
	CasterNetId: 'uint32',
	Slot: 'uint8',
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		RunningTime: 'float',
		Duration: 'float',
		numInGroup: 'uint8',
		Entries: [BuffInGroupReplace, 'numInGroup'],
	}
};
