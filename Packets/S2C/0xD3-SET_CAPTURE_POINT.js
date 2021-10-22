var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		CapturePointIndex: 'uint8',
		OtherNetID: 'uint32',
		PARType: 'uint8',
		AttackTeam: 'uint32',
		CapturePointUpdateCommand: 'uint8',
	}
};
