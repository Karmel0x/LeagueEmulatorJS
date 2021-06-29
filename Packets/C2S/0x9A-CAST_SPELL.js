var BasePacket = require('../BasePacket');
var Vector2 = require('../SharedStruct/Vector2');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: 'uint8',
        //this.IsSummonerSpellBook = (bitfield & 0x01) != 0;
        //this.IsHudClickCast = (bitfield & 0x02) != 0;
		Slot: 'uint8',
		Position: Vector2,
		EndPosition: Vector2,
		TargetNetID: 'uint32',
	}
};
