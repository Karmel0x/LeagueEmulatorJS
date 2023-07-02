const BasePacket = require('../BasePacket');

const UpdateLevelPropData = {//todo
	stringParam1: ['char', 64],
	floatParam1: 'float',
	floatParam2: 'float',
	netId: 'uint32',
	flags1: 'uint32',
	command: 'uint32',
	byteParam1: 'uint8',
	byteParam2: 'uint8',
	byteParam3: 'uint8',
};

module.exports = class UpdateLevelProp extends BasePacket {
	static struct = {
		updateLevelPropData: UpdateLevelPropData,
	}
};
