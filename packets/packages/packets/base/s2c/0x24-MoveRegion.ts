import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import type { NetId } from '../../types/player';

export type MoveRegionModel = BasePacketModel & {
	regionNetId: NetId,
	position: SVector2Model,
};

export default class MoveRegion extends BasePacket {
	static create(payload: Partial<MoveRegionModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: MoveRegionModel) {
		super.reader(dvr, payload);

		payload.regionNetId = dvr.readUint32();
		payload.position = SVector2.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: MoveRegionModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.regionNetId);
		SVector2.writer(dvr, payload.position);
	}
}
