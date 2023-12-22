import BasePacket from '../BasePacket';

/**
 * Used for dominion game mode
 */
export default class IncrementPlayerScore extends BasePacket {
	static struct = {
		playerNetId: 'uint32',
		scoreCategory: 'uint8',
		scoreEvent: 'uint8',
		bitfield: ['bitfield', {
			shouldCallout: 1,
		}],
		pointValue: 'float',
		totalPointValue: 'float',
	};
}
