var BasePacket = require('../BasePacket');

var UpdateLevelPropData = {//todo
    stringParam1: ['char', 64],
    floatParam1: 'float',
    floatParam2: 'float',
    netID: 'uint32',
    flags1: 'uint32',
    command: 'uint32',
    byteParam1: 'uint8',
    byteParam2: 'uint8',
    byteParam3: 'uint8',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		UpdateLevelPropData: UpdateLevelPropData,
	}
};
