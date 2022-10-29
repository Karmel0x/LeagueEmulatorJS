const BasePacket = require('../BasePacket');

/**
 * Scoreboard??
 */
module.exports = class StatsUpdateReq extends BasePacket {
	static struct = {
		detectedHackModuleHash: 'uint32',
		detectedHackModuleSize: 'uint32',
		detectedHackModuleTimeStamp: 'uint32',
		clientReportedSkinId: 'uint32',
		skinAssetHash: 'uint32',
	}
};
