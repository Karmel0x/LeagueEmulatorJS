var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');

var FXCreateData = {
    TargetNetID: 'uint32',
    NetAssignedNetID: 'uint32',
    CasterNetID: 'uint32',
    BindNetID: 'uint32',
    KeywordNetID: 'uint32',
    Position: {
        X: 'int16',
        Y: 'float',
        Z: 'int16',
    },
    TargetPosition: {
        X: 'int16',
        Y: 'float',
        Z: 'int16',
    },
    OwnerPosition: {
        X: 'int16',
        Y: 'float',
        Z: 'int16',
    },
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
    FXCreateData: [FXCreateData, 'count'],
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		count: 'uint8',
		FXCreateGroupData: [FXCreateGroupData, 'count'],
	}
};
