import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type ChangeCharacterVoiceModel = BasePacketModel & {
	unknown1: boolean,
	voiceOverride: string,
};

export default class ChangeCharacterVoice extends BasePacket {
	static create(payload: Partial<ChangeCharacterVoiceModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: ChangeCharacterVoiceModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;

		payload.voiceOverride = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: ChangeCharacterVoiceModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});

		dvr.writeStringNullTerminated(payload.voiceOverride, 64);
	}
}
