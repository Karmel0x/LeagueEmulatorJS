import BasePacket from '../BasePacket';


/**
 * blue tip on right side of the screen
 */
export default class HandleTipUpdate extends BasePacket {
	static commads = {
		ACTIVATE_TIP: 0,
		REMOVE_TIP: 1,
		ENABLE_TIP_EVENTS: 2,
		DISABLE_TIP_EVENTS: 3,
		ACTIVATE_TIP_DIALOGUE: 4,
		ENABLE_TIP_DIALOGUE_EVENTS: 5,
		DISABLE_TIP_DIALOGUE_EVENTS: 6,
	};
	static struct = {
		tipText: ['char', 128],
		tipTitle: ['char', 128],
		tipImagePath: ['char', 128],
		tipCommand: 'uint8',
		tipId: 'uint32',
	};
}
