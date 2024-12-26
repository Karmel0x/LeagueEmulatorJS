import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId } from '../../types/player';

export type World_LockCamera_ServerModel = BasePacketModel & {
	locked: boolean,
	clientId: ClientId,
};

export default class World_LockCamera_Server extends BasePacket {
	static create(payload: Partial<World_LockCamera_ServerModel>) {
		return super.create(payload);
	}

	static bitfield = {
		locked: 1,
	};

	static reader(dvr: RelativeDataView, payload: World_LockCamera_ServerModel) {
		super.reader(dvr, payload);

		let bitfield = dvr.readBitfield(this.bitfield);
		payload.locked = bitfield.locked;

		payload.clientId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: World_LockCamera_ServerModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield, {
			locked: payload.locked,
		});

		dvr.writeUint32(payload.clientId);
	}
}
