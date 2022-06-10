const BasePacket = require('../BasePacket');
var SVector2 = require('../SharedStruct/SVector2');


module.exports = class CastSpellReq extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isSummonerSpellBook: 1,
			isHudClickCast: 2,
		}],
		slot: 'uint8',
		position: SVector2,
		endPosition: SVector2,
		targetNetId: 'uint32',
	}
};
