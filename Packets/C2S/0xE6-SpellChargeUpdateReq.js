const BasePacket = require('../BasePacket');
const SVector3 = require('../SharedStruct/SVector3');


module.exports = class SpellChargeUpdateReq extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			isSummonerSpellBook: 1,
			forceStop: 2,
		}],
		slot: 'uint8',
		position: SVector3,
	}
};
