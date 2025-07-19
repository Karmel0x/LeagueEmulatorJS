import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type CreateUnitHighlightModel = BasePacketModel & {
	targetNetId: NetId,
};

export default class CreateUnitHighlight extends BasePacket {
	static create(payload: Partial<CreateUnitHighlightModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: CreateUnitHighlightModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: CreateUnitHighlightModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
	}
}
