import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type SetHoverIndicatorTargetModel = BasePacketModel & {
	targetNetId: NetId;
};

export default class SetHoverIndicatorTarget extends BasePacket {
	static create(payload: Partial<SetHoverIndicatorTargetModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetHoverIndicatorTargetModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: SetHoverIndicatorTargetModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
	}
}
