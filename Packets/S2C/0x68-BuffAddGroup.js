var BasePacket = require('../BasePacket');

const BuffInGroupAdd = {
	OwnerNetID: 'uint32',
	CasterNetID: 'uint32',
	Slot: 'uint8',
	Count: 'uint8',
	IsHidden: 'uint8',
};


module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffType: 'uint8',
		BuffNameHash: 'uint32',
		PackageHash: 'uint32',
		RunningTime: 'float',
		Duration: 'float',
		numInGroup: 'uint8',
		BuffInGroupAdd: [BuffInGroupAdd, 'numInGroup'],
	}
	writer(buffer){
		this.numInGroup = this.numInGroup ?? this.BuffInGroupAdd.length;
		super.writer(buffer);
	}
};
