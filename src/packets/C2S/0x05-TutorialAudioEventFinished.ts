import BasePacket from '../BasePacket';

export default class TutorialAudioEventFinished extends BasePacket {
	static struct = {
		audioEventNetId: 'uint32',
	};
}
