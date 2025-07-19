import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';


export type OnEnterLocalVisibilityClientModel = BasePacketModel & {
	packets?: Uint8Array[],
	health: number,
	currentHealth: number,
};

/**
 * set health
 */
export default class OnEnterLocalVisibilityClient extends BasePacket {
	static create(payload: Partial<OnEnterLocalVisibilityClientModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnEnterLocalVisibilityClientModel) {
		super.reader(dvr, payload);

		let totalSize = dvr.readUint16();
		payload.packets = [];

		for (; totalSize > 0;) {
			let packetSize = dvr.readUint16();
			totalSize -= 2;

			let packetData = dvr.readByteArray(packetSize);
			totalSize -= packetSize;

			payload.packets.push(packetData);
		}

		if (dvr.offset >= dvr.length)
			return;

		payload.health = dvr.readFloat();
		payload.currentHealth = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: OnEnterLocalVisibilityClientModel) {
		super.writer(dvr, payload);

		let packets = payload.packets || [];
		let totalSize = packets.reduce((acc, packet) => acc + 2 + packet.length, 0);
		dvr.writeUint16(totalSize);

		packets.forEach(packet => {
			dvr.writeUint16(packet.length);
			dvr.writeByteArray(packet);
		});

		if (!payload.health)
			return;

		dvr.writeFloat(payload.health);
		dvr.writeFloat(payload.currentHealth);
	}
}
