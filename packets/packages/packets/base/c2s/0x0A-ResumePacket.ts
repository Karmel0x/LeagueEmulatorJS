import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { ClientId } from '../../types/player';

export type ResumePacketModel = BasePacketModel & {
	clientId: ClientId,
	delayed: boolean,
};

export default class ResumePacket extends BasePacket {
	static create(payload: Partial<ResumePacketModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		delayed: 1,
	};

	static reader(dvr: RelativeDataView, payload: ResumePacketModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.delayed = bitfield1.delayed;
	}

	static writer(dvr: RelativeDataView, payload: ResumePacketModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);

		dvr.writeBitfield(this.bitfield1, {
			delayed: payload.delayed,
		});
	}
}
