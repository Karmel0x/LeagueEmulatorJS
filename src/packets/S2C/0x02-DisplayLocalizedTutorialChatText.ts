import BasePacket from '../BasePacket';


/**
 * orange chat message
 */
export default class DisplayLocalizedTutorialChatText extends BasePacket {
	static struct = {
		message: 'string0',//128
	};
}
