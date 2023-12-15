import BasePacket from '../BasePacket.js';

export default class PlayEmote extends BasePacket {
	static struct = {
		emoteId: 'uint8',
	};
}
