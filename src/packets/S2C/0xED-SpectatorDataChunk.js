const BasePacket = require('../BasePacket');

module.exports = class SpectatorDataChunk extends BasePacket {
	static struct = {
		chunkId: 'int32',
		totalSubChunks: 'int32',
		subChunkId: 'int32',
		spectatorChunkType: 'uint8',
		totalSize: 'int32',
		duration: 'int32',
		nextChunkId: 'int32',
	}
	reader(buffer){
		super.reader(buffer);

		this.data = buffer.readobj(['uint8', buffer.length - buffer.off]);
	}
	writer(buffer){
		super.writer(buffer);

		buffer.writeobj(['uint8', this.data.length], this.data);
	}
};
