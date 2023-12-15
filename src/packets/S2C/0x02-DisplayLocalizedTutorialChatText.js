import BasePacket from '../BasePacket.js';


/**
 * orange chat message
 */
export default class DisplayLocalizedTutorialChatText extends BasePacket {
	static struct = {
		message: 'string0',//128
	};
}
