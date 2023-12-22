import BasePacket from '../BasePacket';

export default class HandleUIHighlight extends BasePacket {
	static struct = {
		uiHighlightCommand: 'uint8',
		uiElement: 'uint8',
	};
}
