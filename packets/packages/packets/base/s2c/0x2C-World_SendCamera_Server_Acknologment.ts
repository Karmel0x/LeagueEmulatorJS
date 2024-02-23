import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type World_SendCamera_Server_AcknologmentModel = BasePacketModel & {
	syncId: number,
};

export default class World_SendCamera_Server_Acknologment extends BasePacket {
	static create(payload: Partial<World_SendCamera_Server_AcknologmentModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: World_SendCamera_Server_AcknologmentModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: World_SendCamera_Server_AcknologmentModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.syncId);
	}
}
