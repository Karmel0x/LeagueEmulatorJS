import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type ExitS2CModel = BasePacketModel & {
	objectNetId: NetId,
	unknown1: boolean,
};

export default class ExitS2C extends BasePacket {
	static create(payload: Partial<ExitS2CModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,// isAlly ?
	};

	static reader(dvr: RelativeDataView, payload: ExitS2CModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;
	}

	static writer(dvr: RelativeDataView, payload: ExitS2CModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});
	}
}
