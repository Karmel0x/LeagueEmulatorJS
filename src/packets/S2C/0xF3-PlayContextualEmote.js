import BasePacket from '../BasePacket.js';

export default class PlayContextualEmote extends BasePacket {
	static struct = {
		contextualEmoteId: 'uint8',
		hashedParam: 'uint32',
		contextualEmoteFlags: 'uint8',
	};
}
