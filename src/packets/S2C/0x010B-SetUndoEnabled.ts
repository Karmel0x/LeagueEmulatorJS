import ExtendedPacket from '../ExtendedPacket';


export default class SetUndoEnabled extends ExtendedPacket {
	static struct = {
		undoStackSize: 'uint8',
	};
}
