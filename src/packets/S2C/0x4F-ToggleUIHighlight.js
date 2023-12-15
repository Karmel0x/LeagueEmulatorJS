import BasePacket from '../BasePacket.js';

export default class ToggleUIHighlight extends BasePacket {
	static struct = {
		elementId: 'uint8',
		elementType: 'uint8',
		elementNumber: 'uint8',
		elementSubCategory: 'uint8',
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	};
}
