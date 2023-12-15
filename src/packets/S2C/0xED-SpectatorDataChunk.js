import BasePacket from '../BasePacket.js';

export default class SpectatorDataChunk extends BasePacket {
	static struct = {
		chunkId: 'int32',
		totalSubChunks: 'int32',
		subChunkId: 'int32',
		spectatorChunkType: 'uint8',
		totalSize: 'int32',
		duration: 'int32',
		nextChunkId: 'int32',
	};
	reader(buffer) {
		super.reader(buffer);

		this.data = buffer.read(['uint8', buffer.length - buffer.offset]);
	}
	writer(buffer) {
		super.writer(buffer);

		buffer.write(['uint8', this.data.length], this.data);
	}
}
