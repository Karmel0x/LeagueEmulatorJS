var BasePacket = require('../BasePacket');
var CastInfo = require('../SharedStruct/CastInfo');


module.exports = class extends BasePacket {//S2C.
	struct = {
		CasterPositionSyncID: 'int32',
		bitfield: 'uint8',
        //this.Unknown1 = (bitfield & 1) != 0;
		CastInfo: JSON.parse(JSON.stringify(CastInfo)),
	}
};
