import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type ReplayOnly_MultiKillCountUpdateModel = ExtendedPacketModel & {
	ownerNetId: NetId,
	multiKillCount: number,
};

export default class ReplayOnly_MultiKillCountUpdate extends ExtendedPacket {
	static create(payload: Partial<ReplayOnly_MultiKillCountUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ReplayOnly_MultiKillCountUpdateModel) {
		super.reader(dvr, payload);

		payload.ownerNetId = dvr.readUint32();
		payload.multiKillCount = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: ReplayOnly_MultiKillCountUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.ownerNetId);
		dvr.writeUint8(payload.multiKillCount);
	}
}
