import BasePacket from '../BasePacket.js';


export default class PausePacket extends BasePacket {
	static struct = {
		clientId: 'int32',
		pauseTimeRemaining: 'int32',
		bitfield: ['bitfield', {
			isTournament: 1,
		}],
	};
}
