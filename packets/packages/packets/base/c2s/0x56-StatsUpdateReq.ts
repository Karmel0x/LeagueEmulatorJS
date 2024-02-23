import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type StatsUpdateReqModel = BasePacketModel & {
	detectedHackModuleHash: number,
	detectedHackModuleSize: number,
	detectedHackModuleTimeStamp: number,
	clientReportedSkinId: number,
	skinAssetHash: number,
};

export default class StatsUpdateReq extends BasePacket {
	static create(payload: Partial<StatsUpdateReqModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: StatsUpdateReqModel) {
		super.reader(dvr, payload);

		payload.detectedHackModuleHash = dvr.readUint32();
		payload.detectedHackModuleSize = dvr.readUint32();
		payload.detectedHackModuleTimeStamp = dvr.readUint32();
		payload.clientReportedSkinId = dvr.readUint32();
		payload.skinAssetHash = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: StatsUpdateReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.detectedHackModuleHash);
		dvr.writeUint32(payload.detectedHackModuleSize);
		dvr.writeUint32(payload.detectedHackModuleTimeStamp);
		dvr.writeUint32(payload.clientReportedSkinId);
		dvr.writeUint32(payload.skinAssetHash);
	}
}
