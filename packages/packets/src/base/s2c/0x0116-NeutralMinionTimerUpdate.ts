import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type NeutralMinionTimerUpdateModel = ExtendedPacketModel & {
	typeHash: number,
	expire: number,
};

export default class NeutralMinionTimerUpdate extends ExtendedPacket {
	static create(payload: Partial<NeutralMinionTimerUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: NeutralMinionTimerUpdateModel) {
		super.reader(dvr, payload);

		payload.typeHash = dvr.readInt32();
		payload.expire = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: NeutralMinionTimerUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.typeHash);
		dvr.writeFloat(payload.expire);
	}
}
