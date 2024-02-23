import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ClientCheatDetectionSignalModel = BasePacketModel & {
	signal: number,
	flags: number,
};

export default class ClientCheatDetectionSignal extends BasePacket {
	static create(payload: Partial<ClientCheatDetectionSignalModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ClientCheatDetectionSignalModel) {
		super.reader(dvr, payload);

		payload.signal = dvr.readUint32();
		payload.flags = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ClientCheatDetectionSignalModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.signal);
		dvr.writeUint32(payload.flags);
	}
}
