import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type BuffRemoveGroupEntryModel = {
	ownerNetId: NetId,
	slot: number,
	runTimeRemove: number,
};

export type BuffRemoveGroupModel = BasePacketModel & {
	nameHash: number,
	entries: BuffRemoveGroupEntryModel[],
};

export default class BuffRemoveGroup extends BasePacket {
	static create(payload: Partial<BuffRemoveGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BuffRemoveGroupModel) {
		super.reader(dvr, payload);

		payload.nameHash = dvr.readUint32();

		let count = dvr.readUint8();
		payload.entries = dvr.readArray(() => ({
			ownerNetId: dvr.readUint32(),
			slot: dvr.readUint8(),
			runTimeRemove: dvr.readFloat(),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: BuffRemoveGroupModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.nameHash);

		payload.entries = payload.entries || [];
		dvr.writeUint8(payload.entries.length);
		payload.entries.forEach(entry => {
			dvr.writeUint32(entry.ownerNetId);
			dvr.writeUint8(entry.slot);
			dvr.writeFloat(entry.runTimeRemove);
		});
	}
}
