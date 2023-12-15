import BasePacket from '../BasePacket.js';

/**
 * Used for dominion game mode
 */
export default class HandleCapturePointUpdate extends BasePacket {
	static struct = {
		capturePointIndex: 'uint8',
		otherNetId: 'uint32',
		parType: 'uint8',
		attackTeam: 'uint32',
		capturePointUpdateCommand: 'uint8',
	};
}
