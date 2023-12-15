import ExtendedPacket from '../ExtendedPacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class CreateMinionCamp extends ExtendedPacket {
	static struct = {
		position: SVector3,
		minimapIcon: ['char', 64],
		campIndex: 'uint8',
		revealAudioVOComponentEvent: 'uint8',
		sideTeamId: 'uint8',
		timerType: 'int32',
		expire: 'float',
	};
}
