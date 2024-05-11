import PrimaryPacket, { PrimaryPacketModel } from '@workspace/network/packages/packets/primary-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type KeyCheckModel = PrimaryPacketModel & {
	partialKey: Uint8Array | number[],
	clientId: number,
	playerId: number,
	versionNumber: number,
	checksum: bigint,
	dummy1: number,
};

export default class KeyCheck extends PrimaryPacket {
	static create(payload: Partial<KeyCheckModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: KeyCheckModel) {
		super.reader(dvr, payload);

		payload.partialKey = dvr.readByteArray(3);
		payload.clientId = dvr.readUint32();
		payload.playerId = dvr.readUint64();
		//payload.versionNumber = dvr.readUint32();
		//payload.checksum = dvr.readBigUint64();
		//payload.dummy1 = dvr.readUint32();
		dvr.readBigUint64();
	}

	static writer(dvr: RelativeDataView, payload: KeyCheckModel) {
		super.writer(dvr, payload);

		dvr.writeByteArray(payload.partialKey, 3);
		dvr.writeUint32(payload.clientId);
		dvr.writeUint64(payload.playerId);
		//dvr.writeUint32(payload.versionNumber);
		//dvr.writeBigUint64(payload.checksum);
		//dvr.writeUint32(payload.dummy1);
		dvr.writeBigUint64(0n);
	}
}
