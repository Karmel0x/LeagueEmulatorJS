import BasePacket from '../BasePacket.js';

/**
 * Used for dominion game mode
 */
export default class HandleGameScore extends BasePacket {
	static struct = {
		team: 'uint32',
		score: 'int32',
	};
}
