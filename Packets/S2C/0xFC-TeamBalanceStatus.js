var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SurrenderReason: 'uint8',
		ForVote: 'uint8',
		AgainstVote: 'uint8',
		TeamID: 'uint32',
		GoldGranted: 'float',
		ExperienceGranted: 'int32',
		TowersGranted: 'int32',
	}
};
