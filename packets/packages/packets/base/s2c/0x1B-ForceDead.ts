import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ForceDeadModel = BasePacketModel & {
	duration: number,
};

export default class ForceDead extends BasePacket {
	static create(payload: Partial<ForceDeadModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ForceDeadModel) {
		super.reader(dvr, payload);

		payload.duration = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ForceDeadModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.duration);
	}
}
