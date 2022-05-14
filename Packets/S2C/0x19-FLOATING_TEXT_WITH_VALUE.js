var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetNetId: 'uint32',
		FloatTextType: 'uint32',
		Param: 'int32',
		Message: 'string0',//128
	}
};
