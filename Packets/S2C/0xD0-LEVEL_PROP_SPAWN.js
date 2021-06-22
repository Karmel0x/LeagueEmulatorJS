
var Vector3 = require('../SharedStruct/Vector3');


module.exports = {//S2C.LEVEL_PROP_SPAWN
	cmd: 'uint8',
	netId: 'uint32',

	NetID: 'uint32',
	NetNodeID: 'uint8',
	SkinID: 'int32',
	Position: Vector3,
	FacingDirection: Vector3,
	PositionOffset: Vector3,
	Scale: Vector3,
	TeamID: 'uint16',
	Rank: 'uint8',
	SkillLevel: 'uint8',
	Type: 'uint32',
    Name: ['char', 64],
    PropName: ['char', 64],
};
