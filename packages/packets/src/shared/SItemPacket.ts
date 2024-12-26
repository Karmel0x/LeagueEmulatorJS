import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SItemPacketModel = {
	itemId: number,
	slot: number,
	itemsInSlot: number,
	spellCharges: number,
};

export default class SItemPacket extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SItemPacketModel;
	}

	static reader(dvr: RelativeDataView, payload: SItemPacketModel) {
		payload.itemId = dvr.readUint32();
		payload.slot = dvr.readUint8();
		payload.itemsInSlot = dvr.readUint8();
		payload.spellCharges = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: SItemPacketModel) {
		dvr.writeUint32(payload.itemId);
		dvr.writeUint8(payload.slot);
		dvr.writeUint8(payload.itemsInSlot);
		dvr.writeUint8(payload.spellCharges);
	}
}
