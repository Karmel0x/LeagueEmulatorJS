import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type UpdateGameOptionsModel = BasePacketModel & {
	autoAttackEnabled: boolean,
};

export default class UpdateGameOptions extends BasePacket {
	static create(payload: Partial<UpdateGameOptionsModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		autoAttackEnabled: 1,
	};

	static reader(dvr: RelativeDataView, payload: UpdateGameOptionsModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.autoAttackEnabled = bitfield1.autoAttackEnabled;
	}

	static writer(dvr: RelativeDataView, payload: UpdateGameOptionsModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			autoAttackEnabled: payload.autoAttackEnabled,
		});
	}
}
