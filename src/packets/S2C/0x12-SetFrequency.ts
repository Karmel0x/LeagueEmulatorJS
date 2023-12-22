import BasePacket from '../BasePacket';


/**
 * setting speed of the game
 * may be used to fast forward game
 */
export default class SetFrequency extends BasePacket {
	static struct = {
		newFrequency: 'float',
	};
}
