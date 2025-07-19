import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SItemPacket, { type SItemPacketModel } from '../../shared/SItemPacket';

export type SetInventoryModel = ExtendedPacketModel & {
	items: SItemPacketModel[],
	itemCooldowns: number[],
	itemMaxCooldowns: number[],
};

export default class SetInventory extends ExtendedPacket {
	static create(payload: Partial<SetInventoryModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetInventoryModel) {
		super.reader(dvr, payload);

		payload.items = dvr.readArray(() => SItemPacket.read(dvr), 10);
		payload.itemCooldowns = dvr.readArray(() => dvr.readFloat(), 10);
		payload.itemMaxCooldowns = dvr.readArray(() => dvr.readFloat(), 10);
	}

	static writer(dvr: RelativeDataView, payload: SetInventoryModel) {
		super.writer(dvr, payload);

		dvr.writeArray(payload.items, item => SItemPacket.writer(dvr, item), 10);
		dvr.writeArray(payload.itemCooldowns, cooldown => dvr.writeFloat(cooldown), 10);
		dvr.writeArray(payload.itemMaxCooldowns, maxCooldown => dvr.writeFloat(maxCooldown), 10);
	}
}
