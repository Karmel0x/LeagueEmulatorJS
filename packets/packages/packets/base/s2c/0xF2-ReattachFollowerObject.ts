import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type ReattachFollowerObjectModel = BasePacketModel & {
	newOwnerNetId: NetId,
};

export default class ReattachFollowerObject extends BasePacket {
	static create(payload: Partial<ReattachFollowerObjectModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ReattachFollowerObjectModel) {
		super.reader(dvr, payload);

		payload.newOwnerNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ReattachFollowerObjectModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.newOwnerNetId);
	}
}
