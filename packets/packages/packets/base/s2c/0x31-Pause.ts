import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type PauseModel = BasePacketModel & {
	position: SVector3Model,
	forward: SVector3Model,
	syncId: number,
};

export default class Pause extends BasePacket {
	static create(payload: Partial<PauseModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PauseModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
		payload.forward = SVector3.read(dvr);
		payload.syncId = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: PauseModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.forward);
		dvr.writeInt32(payload.syncId);
	}
}
