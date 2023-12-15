import BasePacket from '../BasePacket.js';

export default class SyncMissionStartTime extends BasePacket {
	static struct = {
		startTime: 'float',
	};
}
