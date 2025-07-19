import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type LineMissileHitListModel = BasePacketModel & {
	targets: number[],// NetId ?
};

export default class LineMissileHitList extends BasePacket {
	static create(payload: Partial<LineMissileHitListModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: LineMissileHitListModel) {
		super.reader(dvr, payload);

		const targetsLength = dvr.readInt16();
		payload.targets = dvr.readArray(() => dvr.readUint32(), targetsLength);
	}

	static writer(dvr: RelativeDataView, payload: LineMissileHitListModel) {
		if (!payload.targets || !payload.targets.length || payload.targets.length > 0x7FFF)
			return;

		super.writer(dvr, payload);

		dvr.writeInt16(payload.targets.length);
		payload.targets.forEach(target => dvr.writeUint32(target));
	}
}
