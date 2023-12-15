import BasePacket from '../BasePacket.js';

export default class SyncSimTimeFinal extends BasePacket {
	static struct = {
		timeLastClient: 'float',
		timeRTTLastOverhead: 'float',
		timeConvergance: 'float',
	};
}
