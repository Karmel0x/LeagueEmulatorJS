var BasePacket = require('../BasePacket');
var CastInfo = require('../SharedStruct/CastInfo');


module.exports = class extends BasePacket {//S2C.
	struct = {
		CasterPositionSyncID: 'int32',
		bitfield_Unknown: 'uint8',
		CastInfo: JSON.parse(JSON.stringify(CastInfo)),//todo
	}
};
