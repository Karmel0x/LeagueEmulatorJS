const BasePacket = require('../BasePacket');

module.exports = class UpgradeSpellReq extends BasePacket {
	static struct = {
		slot: 'uint8',
		//bitfield: ['bitfield', {
		//	isEvolve: 1,
		//}],
	}
};
