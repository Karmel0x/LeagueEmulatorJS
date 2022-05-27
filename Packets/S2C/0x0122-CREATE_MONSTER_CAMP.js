var ExtendedPacket = require('../ExtendedPacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		position: Vector3,
		MinimapIcon: ['char', 64],
		CampIndex: 'uint8',
		RevealAudioVOComponentEvent: 'uint8',
		SideTeamID: 'uint8',
		TimerType: 'int32',
		Expire: 'float',
	}
};
