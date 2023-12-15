import BasePacket from '../BasePacket.js';

export default class HandleUIHighlight extends BasePacket {
	static struct = {
		uiHighlightCommand: 'uint8',
		uiElement: 'uint8',
	};
}
