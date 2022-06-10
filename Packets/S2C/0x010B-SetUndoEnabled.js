var ExtendedPacket = require('../ExtendedPacket');


module.exports = class SetUndoEnabled extends ExtendedPacket {
	static struct = {
		undoStackSize: 'uint8',
	}
};
