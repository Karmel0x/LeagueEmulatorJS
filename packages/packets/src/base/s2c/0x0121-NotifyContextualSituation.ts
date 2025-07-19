import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type NotifyContextualSituationModel = ExtendedPacketModel & {
	situationNameHash: number,
};

export default class NotifyContextualSituation extends ExtendedPacket {
	static create(payload: Partial<NotifyContextualSituationModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: NotifyContextualSituationModel) {
		super.reader(dvr, payload);

		payload.situationNameHash = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: NotifyContextualSituationModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.situationNameHash);
	}
}
