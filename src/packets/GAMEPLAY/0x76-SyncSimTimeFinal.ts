import BasePacket from '../BasePacket';

export default class SyncSimTimeFinal extends BasePacket {
	static struct = {
		timeLastClient: 'float',
		timeRTTLastOverhead: 'float',
		timeConvergance: 'float',
	};
}
