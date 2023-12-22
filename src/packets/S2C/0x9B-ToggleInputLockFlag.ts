import BasePacket from '../BasePacket';

export default class ToggleInputLockFlag extends BasePacket {
	static struct = {
		inputLockFlags: 'uint32',
	};
}
