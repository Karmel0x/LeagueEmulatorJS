import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import CMovementDataNormal, { type CMovementDataNormalModel } from '../../shared/CMovementDataNormal';

export type WaypointGroupModel = BasePacketModel & {
	syncId: number,
	movementData: CMovementDataNormalModel[],
};

export default class WaypointGroup extends BasePacket {
	static create(payload: Partial<WaypointGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WaypointGroupModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		let count = dvr.readInt16();
		payload.movementData = dvr.readArray(() => CMovementDataNormal.read(dvr), count);
	}

	static writer(dvr: RelativeDataView, payload: WaypointGroupModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);

		dvr.writeInt16(payload.movementData.length);
		payload.movementData.forEach(movementData => CMovementDataNormal.writer(dvr, movementData));
	}
}
