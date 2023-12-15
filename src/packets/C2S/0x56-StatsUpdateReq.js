import BasePacket from '../BasePacket.js';

/**
 * Scoreboard??
 */
export default class StatsUpdateReq extends BasePacket {
	static struct = {
		detectedHackModuleHash: 'uint32',
		detectedHackModuleSize: 'uint32',
		detectedHackModuleTimeStamp: 'uint32',
		clientReportedSkinId: 'uint32',
		skinAssetHash: 'uint32',
	};
}
