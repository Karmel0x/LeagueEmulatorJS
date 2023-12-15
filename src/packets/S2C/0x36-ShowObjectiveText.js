import BasePacket from '../BasePacket.js';


/**
 * text in border on middle of the screen
 * to hide it use HideObjectiveText
 */
export default class ShowObjectiveText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	};
}
