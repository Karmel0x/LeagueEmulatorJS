import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type RemoveRegionModel = BasePacketModel & {
	regionNetId: NetId,
};

export default class RemoveRegion extends BasePacket {
	static create(payload: Partial<RemoveRegionModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RemoveRegionModel) {
		super.reader(dvr, payload);

		payload.regionNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: RemoveRegionModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.regionNetId);
	}
}
