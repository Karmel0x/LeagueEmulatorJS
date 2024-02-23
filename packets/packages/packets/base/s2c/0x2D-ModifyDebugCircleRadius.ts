import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ModifyDebugCircleRadiusModel = BasePacketModel & {
	objectId: number,
	radius: number,
};

export default class ModifyDebugCircleRadius extends BasePacket {
	static create(payload: Partial<ModifyDebugCircleRadiusModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ModifyDebugCircleRadiusModel) {
		super.reader(dvr, payload);

		payload.objectId = dvr.readInt32();
		payload.radius = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ModifyDebugCircleRadiusModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.objectId);
		dvr.writeFloat(payload.radius);
	}
}
