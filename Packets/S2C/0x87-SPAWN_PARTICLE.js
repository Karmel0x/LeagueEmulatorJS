var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');
var Vector3b = require('../SharedStruct/Vector3b');


var FXCreateData = {
	TargetNetId: 'uint32',
	NetAssignedNetId: 'uint32',
	CasterNetId: 'uint32',
	BindNetId: 'uint32',
	KeywordNetId: 'uint32',
	position: Vector3b,
	targetPosition: Vector3b,
	OwnerPosition: Vector3b,
	OrientationVector: Vector3,
	TimeSpent: 'float',
	ScriptScale: 'float',
};
var FXCreateGroupData = {
	PackageHash: 'uint32',
	EffectNameHash: 'uint32',
	Flags: 'uint16',
	TargetBoneNameHash: 'uint32',
	BoneNameHash: 'uint32',
	count: 'uint8',
	//FXCreateData: [FXCreateData, 1],//'count'
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		count: 'uint8',
		//FXCreateGroupData: [FXCreateGroupData, 1],//'count'
	}
	reader(buffer){
		super.reader(buffer);

		this.FXCreateGroupData = [];
		for(let i = 0; i < this.count; i++){
			this.FXCreateGroupData[i] = buffer.readobj(FXCreateGroupData);
			this.FXCreateGroupData[i].FXCreateData = buffer.readobj([FXCreateData, this.FXCreateGroupData[i].count]);
		}
	}
	writer(buffer){
		this.count = this.count ?? this.FXCreateGroupData.length;
		super.writer(buffer);

		for(let i = 0; i < this.count; i++){
			buffer.writeobj(FXCreateGroupData, this.FXCreateGroupData[i]);
			this.FXCreateGroupData[i].count = this.FXCreateGroupData[i].count ?? this.FXCreateGroupData[i].FXCreateData.length;
			buffer.writeobj([FXCreateData, this.FXCreateGroupData[i].count], this.FXCreateGroupData[i].FXCreateData);
		}
	}
};
