import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type FX_KillModel = BasePacketModel & {
	objectNetId: NetId,
};

export default class FX_Kill extends BasePacket {
	static create(payload: Partial<FX_KillModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: FX_KillModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: FX_KillModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
	}
}
