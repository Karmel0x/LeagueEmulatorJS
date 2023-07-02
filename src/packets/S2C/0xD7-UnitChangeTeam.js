const BasePacket = require('../BasePacket');

module.exports = class UnitChangeTeam extends BasePacket {
	static struct = {
		unitNetId: 'uint32',
		team: 'uint32',
	}
};
