var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.TURRET_SPAWN
	struct = {
		NetID: 'uint32',
		NetNodeID: 'uint8',
		Name: ['char', 64],//utf-8?
		IsTargetable: 'uint8',
		IsTargetableToTeamSpellFlags: 'uint32',
	}
};
