import BasePacket from '../BasePacket.js';


/**
 * shows text in border on right of the screen
 * to hide it use HideAuxiliaryText
 */
export default class ShowAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	};
}
