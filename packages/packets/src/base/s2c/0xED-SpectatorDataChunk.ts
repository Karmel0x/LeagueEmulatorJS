import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SpectatorDataChunkModel = BasePacketModel & {
	chunkId: number,
	totalSubChunks: number,
	subChunkId: number,
	spectatorChunkType: number,
	totalSize: number,
	duration: number,
	nextChunkId: number,
	data: Uint8Array,
};

export default class SpectatorDataChunk extends BasePacket {
	static create(payload: Partial<SpectatorDataChunkModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpectatorDataChunkModel) {
		super.reader(dvr, payload);

		payload.chunkId = dvr.readInt32();
		payload.totalSubChunks = dvr.readInt32();
		payload.subChunkId = dvr.readInt32();
		payload.spectatorChunkType = dvr.readUint8();
		payload.totalSize = dvr.readInt32();
		payload.duration = dvr.readInt32();
		payload.nextChunkId = dvr.readInt32();

		const dataLeft = dvr.bytesLeft;
		payload.data = dvr.readUint8Array(dataLeft);
	}

	static writer(dvr: RelativeDataView, payload: SpectatorDataChunkModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.chunkId);
		dvr.writeInt32(payload.totalSubChunks);
		dvr.writeInt32(payload.subChunkId);
		dvr.writeUint8(payload.spectatorChunkType);
		dvr.writeInt32(payload.totalSize);
		dvr.writeInt32(payload.duration);
		dvr.writeInt32(payload.nextChunkId);

		dvr.writeByteArray(payload.data);
	}
}
