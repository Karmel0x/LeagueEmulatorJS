import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import CMovementDataWithSpeed, { CMovementDataWithSpeedModel } from '../../shared/CMovementDataWithSpeed';

export type WaypointGroupWithSpeedModel = BasePacketModel & {
	syncId: number,
	movementData: CMovementDataWithSpeedModel[],
};

export default class WaypointGroupWithSpeed extends BasePacket {
	static create(payload: Partial<WaypointGroupWithSpeedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: WaypointGroupWithSpeedModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		let count = dvr.readInt16();
		payload.movementData = dvr.readArray(() => CMovementDataWithSpeed.read(dvr), count);
	}

	static writer(dvr: RelativeDataView, payload: WaypointGroupWithSpeedModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);

		dvr.writeInt16(payload.movementData.length);
		payload.movementData.forEach(movementData => CMovementDataWithSpeed.writer(dvr, movementData));
	}
}
