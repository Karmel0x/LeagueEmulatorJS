import BasePacket from '../BasePacket';

/**
 * Used for dominion game mode
 */
export default class HandleGameScore extends BasePacket {
	static struct = {
		team: 'uint32',
		score: 'int32',
	};
}
