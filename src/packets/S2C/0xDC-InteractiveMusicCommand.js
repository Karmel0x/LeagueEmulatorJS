import BasePacket from '../BasePacket.js';


export default class InteractiveMusicCommand extends BasePacket {
	static struct = {
		musicCommand: 'uint8',
		musicEventAudioEventId: 'uint32',
		musicParamAudioEventId: 'uint32',
	};
}
