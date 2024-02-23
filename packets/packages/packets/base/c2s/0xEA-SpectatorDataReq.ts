import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SpectatorDataReqModel = BasePacketModel & {
	sendMetaData: boolean,
	jumpToLatest: boolean,
	startChunkId: number,
	startKeyFrameId: number,
};

export default class SpectatorDataReq extends BasePacket {
	static create(payload: Partial<SpectatorDataReqModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpectatorDataReqModel) {
		super.reader(dvr, payload);

		payload.sendMetaData = dvr.readBool();
		payload.jumpToLatest = dvr.readBool();
		payload.startChunkId = dvr.readInt32();
		payload.startKeyFrameId = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: SpectatorDataReqModel) {
		super.writer(dvr, payload);

		dvr.writeBool(payload.sendMetaData);
		dvr.writeBool(payload.jumpToLatest);
		dvr.writeInt32(payload.startChunkId);
		dvr.writeInt32(payload.startKeyFrameId);
	}
}
