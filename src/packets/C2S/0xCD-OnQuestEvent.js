import BasePacket from '../BasePacket.js';


export default class OnQuestEvent extends BasePacket {
	static struct = {
		questEvent: 'uint8',
		questId: 'uint32',
	};
}
