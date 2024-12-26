import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type SetSpellDataModel = BasePacketModel & {
	objectNetId: NetId,
	hashedName: number,
	slot: number,
};

export default class SetSpellData extends BasePacket {
	static create(payload: Partial<SetSpellDataModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetSpellDataModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.hashedName = dvr.readUint32();
		payload.slot = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: SetSpellDataModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint32(payload.hashedName);
		dvr.writeUint8(payload.slot);
	}
}
