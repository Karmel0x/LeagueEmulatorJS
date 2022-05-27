var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			IsSummonerSpellBook: 1,
			IsHudClickCast: 2,
		}],
		Slot: 'uint8',
		position: Vector2,
		EndPosition: Vector2,
		TargetNetId: 'uint32',
	}
};
