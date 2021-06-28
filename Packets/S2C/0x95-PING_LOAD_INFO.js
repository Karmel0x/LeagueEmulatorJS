var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.PING_LOAD_INFO
	struct = {
		ClientID: 'int32',
		PlayerID: 'int64',
		Percentage: 'float',
		ETA: 'float',
		Count: 'uint16',
		Ping: 'uint16',
		Ready_bitField: 'uint8',//(bitfield & 0x01) != 0
	}
};
