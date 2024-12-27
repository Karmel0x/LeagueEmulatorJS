import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type UpdateAscendedModel = ExtendedPacketModel & {
	ascendedNetId: NetId,
};

export default class UpdateAscended extends ExtendedPacket {
	static create(payload: Partial<UpdateAscendedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpdateAscendedModel) {
		super.reader(dvr, payload);

		payload.ascendedNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: UpdateAscendedModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.ascendedNetId);
	}
}
