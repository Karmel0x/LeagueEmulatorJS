var SVector3 = require('../SharedStruct/SVector3');

module.exports = {//SBasicAttackData
	targetNetId: 'uint32',
	extraTime: 'int8',//(extraTime - 128) / 100.0f
	missileNextId: 'uint32',
	attackSlot: 'uint8',
	//targetPosition: SVector3,
};
