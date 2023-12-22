import BasePacket from '../BasePacket';

export default class SyncMissionStartTime extends BasePacket {
	static struct = {
		startTime: 'float',
	};
}
