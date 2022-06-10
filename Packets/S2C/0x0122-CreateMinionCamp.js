var ExtendedPacket = require('../ExtendedPacket');
const SVector3 = require('../SharedStruct/SVector3');


module.exports = class CreateMinionCamp extends ExtendedPacket {
	static struct = {
		position: SVector3,
		minimapIcon: ['char', 64],
		campIndex: 'uint8',
		revealAudioVOComponentEvent: 'uint8',
		sideTeamID: 'uint8',
		timerType: 'int32',
		expire: 'float',
	}
};
