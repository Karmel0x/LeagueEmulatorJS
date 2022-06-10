const BasePacket = require('../BasePacket');

module.exports = class UpdateGameOptions extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			autoAttackEnabled: 1,
		}],
	}
};
