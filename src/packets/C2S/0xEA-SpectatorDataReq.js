const BasePacket = require('../BasePacket');

module.exports = class SpectatorDataReq extends BasePacket {
	static struct = {
		sendMetaData: 'uint8',
		jumpToLatest: 'uint8',
		startChunkId: 'int32',
		startKeyFrameId: 'int32',
	}
};
