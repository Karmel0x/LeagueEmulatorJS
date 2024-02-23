import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SpectatorDataChunkInfoModel = BasePacketModel & {
	startGameChunkId: number,
	endGameChunkId: number,
};

export default class SpectatorDataChunkInfo extends BasePacket {
	static create(payload: Partial<SpectatorDataChunkInfoModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpectatorDataChunkInfoModel) {
		super.reader(dvr, payload);

		payload.startGameChunkId = dvr.readInt32();
		payload.endGameChunkId = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: SpectatorDataChunkInfoModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.startGameChunkId);
		dvr.writeInt32(payload.endGameChunkId);
	}
}
