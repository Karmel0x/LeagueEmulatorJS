var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		KillerNetID: 'uint32',
		CampIndex: 'int32',
		TimerType: 'int32',
		TimerExpire: 'float',
		bitfield_DoPlayVO: 'uint8',
	}
};
