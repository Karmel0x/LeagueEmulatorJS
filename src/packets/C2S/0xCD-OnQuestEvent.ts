import BasePacket from '../BasePacket';


export default class OnQuestEvent extends BasePacket {
	static struct = {
		questEvent: 'uint8',
		questId: 'uint32',
	};
}
