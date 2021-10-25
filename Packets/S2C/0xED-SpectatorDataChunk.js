var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ChunkID: 'int32',
		TotalSubChunks: 'int32',
		SubChunkID: 'int32',
		SpectatorChunkType: 'uint8',
		TotalSize: 'int32',
		Duration: 'int32',
		NextChunkID: 'int32',
	}
	reader(buffer){
		super.reader(buffer);

		this.Data = buffer.readobj(['uint8', buffer.length - buffer.off]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj(['uint8', buffer.length - buffer.off], this.Data);
	}
};
