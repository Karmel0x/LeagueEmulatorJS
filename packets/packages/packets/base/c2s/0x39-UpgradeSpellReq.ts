import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type UpgradeSpellReqModel = BasePacketModel & {
	slot: number,
	isEvolve: boolean,
};

export default class UpgradeSpellReq extends BasePacket {
	static create(payload: Partial<UpgradeSpellReqModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isEvolve: 1,
	};

	static reader(dvr: RelativeDataView, payload: UpgradeSpellReqModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();
		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isEvolve = bitfield1.isEvolve;
	}

	static writer(dvr: RelativeDataView, payload: UpgradeSpellReqModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);
		dvr.writeBitfield(this.bitfield1, {
			isEvolve: payload.isEvolve,
		});
	}
}
