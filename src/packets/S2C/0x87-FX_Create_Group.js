const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');
const SVector3b = require('../sharedstruct/SVector3b');


const FXCreateData = {
	targetNetId: 'uint32',
	netAssignedNetId: 'uint32',
	casterNetId: 'uint32',
	bindNetId: 'uint32',
	keywordNetId: 'uint32',
	position: SVector3b,
	targetPosition: SVector3b,
	ownerPosition: SVector3b,
	orientationVector: SVector3,
	timeSpent: 'float',
	scriptScale: 'float',
};

const FXCreateGroupData = {
	packageHash: 'uint32',
	effectNameHash: 'uint32',
	flags: 'uint16',
	targetBoneNameHash: 'uint32',
	boneNameHash: 'uint32',
	count: 'uint8',
};

module.exports = class FX_Create_Group extends BasePacket {
	static struct = {
		count: 'uint8',
		//FXCreateGroupData: [FXCreateGroupData, 1],//'count'
	}
	reader(buffer) {
		super.reader(buffer);

		this.FXCreateGroupData = [];
		for (let i = 0; i < this.count; i++) {
			this.FXCreateGroupData[i] = buffer.readobj(FXCreateGroupData);
			this.FXCreateGroupData[i].FXCreateData = buffer.readobj([FXCreateData, this.FXCreateGroupData[i].count]);
		}
	}
	writer(buffer) {
		if (!this.FXCreateGroupData || !this.FXCreateGroupData.length || this.FXCreateGroupData.length > 0xFF)
			return;

		this.count = this.FXCreateGroupData.length;

		super.writer(buffer);

		for (let i = 0; i < this.count; i++) {
			buffer.writeobj(FXCreateGroupData, this.FXCreateGroupData[i]);
			if (!this.FXCreateGroupData[i].FXCreateData || !this.FXCreateGroupData[i].FXCreateData.length || this.FXCreateGroupData[i].FXCreateData.length > 0xFF)
				continue;

			this.FXCreateGroupData[i].count = this.FXCreateGroupData[i].FXCreateData.length;
			buffer.writeobj([FXCreateData, this.FXCreateGroupData[i].count], this.FXCreateGroupData[i].FXCreateData);
		}
	}
};
