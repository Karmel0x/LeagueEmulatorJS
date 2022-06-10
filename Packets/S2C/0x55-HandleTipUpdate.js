const BasePacket = require('../BasePacket');

const tipCommands = {
	ACTIVATE_TIP: 0,
	REMOVE_TIP: 1,
	ENABLE_TIP_EVENTS: 2,
	DISABLE_TIP_EVENTS: 3,
	ACTIVATE_TIP_DIALOGUE: 4,
	ENABLE_TIP_DIALOGUE_EVENTS: 5,
	DISABLE_TIP_DIALOGUE_EVENTS: 6,
};

module.exports = class HandleTipUpdate extends BasePacket {
	static struct = {
		tipName: ['char', 128],
		tipOther: ['char', 128],
		tipImagePath: ['char', 128],
		tipCommand: 'uint8',
		tipId: 'uint32',
	}
};
