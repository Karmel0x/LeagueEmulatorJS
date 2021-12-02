var BasePacket = require('../BasePacket');
var CastInfo = require('../SharedStruct/CastInfo');


module.exports = class extends BasePacket {//S2C.CAST_SPELL_ANS
	struct = {
		CasterPositionSyncID: 'int32',
		bitfield_Unknown: 'uint8',
		CastInfo: JSON.parse(JSON.stringify(CastInfo)),//todo
	}
	writer(buffer){
		this.CastInfo.targetCount = this.CastInfo.target.length;
		this.CastInfo.size = 102 + this.CastInfo.targetCount * 5;

		super.writer(buffer);
	}
};
