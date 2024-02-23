import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type AnimationOverridesModel = {
	from: string,
	to: string,
};

export type SetAnimStatesModel = BasePacketModel & {
	overrides: AnimationOverridesModel[],
};

export default class SetAnimStates extends BasePacket {
	static create(payload: SetAnimStatesModel) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SetAnimStatesModel) {
		super.reader(dvr, payload);

		let count = dvr.readUint8();
		payload.overrides = dvr.readArray(() => ({
			from: dvr.readString(),
			to: dvr.readString(),
		}), count);
	}

	static writer(dvr: RelativeDataView, payload: SetAnimStatesModel) {
		if (!payload.overrides || payload.overrides.length < 1)
			return;

		super.writer(dvr, payload);

		dvr.writeUint8(payload.overrides.length);
		payload.overrides.forEach(override => {
			dvr.writeString(override.from);
			dvr.writeString(override.to);
		});
	}
}