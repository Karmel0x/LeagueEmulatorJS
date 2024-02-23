import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type NavFlagCircleModel = {
	position: SVector2Model,
	radius: number,
	flags: number,
};

export type WriteNavFlagsModel = BasePacketModel & {
	syncId: number,
	navFlagCircles: NavFlagCircleModel[],
};

export default class WriteNavFlags extends BasePacket {
	static create(payload: Partial<WriteNavFlagsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WriteNavFlagsModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		let size = dvr.readInt16();
		payload.navFlagCircles = dvr.readArray(() => ({
			position: SVector2.read(dvr),
			radius: dvr.readFloat(),
			flags: dvr.readUint32(),
		}), size / 16);
	}

	static writer(dvr: RelativeDataView, payload: WriteNavFlagsModel) {
		if (!payload.navFlagCircles || !payload.navFlagCircles.length)
			return;

		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);

		payload.navFlagCircles = payload.navFlagCircles || [];
		dvr.writeInt16(payload.navFlagCircles.length * 16);
		payload.navFlagCircles.forEach(navFlagCircle => {
			SVector2.writer(dvr, navFlagCircle.position);
			dvr.writeFloat(navFlagCircle.radius);
			dvr.writeUint32(navFlagCircle.flags);
		});
	}
}
