import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SCastInfo, { type SCastInfoModel } from '../../shared/SCastInfo';

export type CastSpellAnsModel = BasePacketModel & {
	casterPositionSyncId: number,
	unknown1: boolean,
	castInfo: SCastInfoModel,
};

export default class CastSpellAns extends BasePacket {
	static create(payload: Partial<CastSpellAnsModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: CastSpellAnsModel) {
		super.reader(dvr, payload);

		payload.casterPositionSyncId = dvr.readInt32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;

		payload.castInfo = SCastInfo.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: CastSpellAnsModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.casterPositionSyncId);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});

		SCastInfo.writer(dvr, payload.castInfo);
	}
}
