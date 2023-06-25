const SVector3 = require('../sharedstruct/SVector3');

module.exports = {//SBasicAttackData
	targetNetId: 'uint32',
	extraTime: 'int8',//(extraTime - 128) / 100.0f
	missileNextId: 'uint32',
	attackSlot: 'uint8',
	targetPosition: SVector3,
};
