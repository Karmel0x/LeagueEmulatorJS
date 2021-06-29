var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffSlot: 'uint8',
		BuffType: 'uint8',
		Count: 'uint8',
		IsHidden: 'uint8',
		BuffNameHash: 'uint32',
		PackageHash: 'uint32',
		RunningTime: 'float',
		Duration: 'float',
		CasterNetID: 'uint32',
	}
};
