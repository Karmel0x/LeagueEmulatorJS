var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends BasePacket {//C2S.
	struct = {
		bitfield: ['bitfield', {
			IsSummonerSpellBook: 1,
			ForceStop: 2,
		}],
		Slot: 'uint8',
		position: Vector3,
	}
};
