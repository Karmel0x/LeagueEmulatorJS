import BasePacket from '../BasePacket.js';
import SVector2 from '../sharedstruct/SVector2.js';

export default class MapPing extends BasePacket {
	static struct = {
		position: SVector2,
		targetNetId: 'uint32',
		sourceNetId: 'uint32',
		pingCategory: 'uint8',
		bitfield: ['bitfield', {
			playAudio: 1,
			showChat: 2,
			pingThrottled: 4,
			playVO: 8,
		}],//0xFB // 4.18
	};
}
