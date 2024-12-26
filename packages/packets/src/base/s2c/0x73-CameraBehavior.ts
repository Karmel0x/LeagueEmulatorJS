import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type CameraBehaviorModel = BasePacketModel & {
	position: SVector3Model,
};

export default class CameraBehavior extends BasePacket {
	static create(payload: Partial<CameraBehaviorModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: CameraBehaviorModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: CameraBehaviorModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
	}
}
