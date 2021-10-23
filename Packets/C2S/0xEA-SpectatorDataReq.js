var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.
	struct = {
		SendMetaData: 'uint8',
		JumpToLatest: 'uint8',
		StartChunkID: 'int32',
		StartKeyFrameID: 'int32',
	}
};
