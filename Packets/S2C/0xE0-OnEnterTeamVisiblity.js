const BasePacket = require('../BasePacket');

module.exports = class OnEnterTeamVisiblity extends BasePacket {
	static struct = {
		visibilityTeam: 'uint8',
	}
};
