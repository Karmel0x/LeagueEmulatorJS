import BasePacket from '../BasePacket';

export default class SynchSimTime extends BasePacket {
	static struct = {
		synchTime: 'float',
	};
}
