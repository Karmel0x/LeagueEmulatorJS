import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type StartSpawnModel = BasePacketModel & {
	botCountOrder: number,
	botCountChaos: number,
};

export default class StartSpawn extends BasePacket {
	static create(payload: Partial<StartSpawnModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: StartSpawnModel) {
		super.reader(dvr, payload);

		payload.botCountOrder = dvr.readUint8();
		payload.botCountChaos = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: StartSpawnModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.botCountOrder);
		dvr.writeUint8(payload.botCountChaos);
	}
}