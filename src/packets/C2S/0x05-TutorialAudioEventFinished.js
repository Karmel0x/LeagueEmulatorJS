import BasePacket from '../BasePacket.js';

export default class TutorialAudioEventFinished extends BasePacket {
	static struct = {
		audioEventNetId: 'uint32',
	};
}
