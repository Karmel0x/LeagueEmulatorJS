import ExtendedPacket from '../ExtendedPacket.js';


export default class SetUndoEnabled extends ExtendedPacket {
	static struct = {
		undoStackSize: 'uint8',
	};
}
