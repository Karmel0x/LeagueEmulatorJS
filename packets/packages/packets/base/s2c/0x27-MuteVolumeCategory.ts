import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type MuteVolumeCategoryModel = BasePacketModel & {
	volumeCategoryType: number,
	flags: {
		mute: boolean,
	},
};

export default class MuteVolumeCategory extends BasePacket {
	static create(payload: Partial<MuteVolumeCategoryModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		mute: 1,
	};

	static reader(dvr: RelativeDataView, payload: MuteVolumeCategoryModel) {
		super.reader(dvr, payload);

		payload.volumeCategoryType = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.flags = {
			mute: bitfield1.mute,
		};
	}

	static writer(dvr: RelativeDataView, payload: MuteVolumeCategoryModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.volumeCategoryType);

		dvr.writeBitfield(this.bitfield1, payload.flags);
	}
}
