import BasePacket from '../BasePacket.js';

export default class ToggleInputLockFlag extends BasePacket {
	static struct = {
		inputLockFlags: 'uint32',
	};
}
