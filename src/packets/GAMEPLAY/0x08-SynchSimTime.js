import BasePacket from '../BasePacket.js';

export default class SynchSimTime extends BasePacket {
	static struct = {
		timeLastServer: 'float',
		timeLastClient: 'float',
	};
}
