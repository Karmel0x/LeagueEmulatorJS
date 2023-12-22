import BasePacket from '../BasePacket';

export default class PlayEmote extends BasePacket {
	static struct = {
		emoteId: 'uint8',
	};
}
