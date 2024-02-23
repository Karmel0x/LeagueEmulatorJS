import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type DebugLogGoldSourcesModel = ExtendedPacketModel & {
	message: string,
};

export default class DebugLogGoldSources extends ExtendedPacket {
	static create(payload: Partial<DebugLogGoldSourcesModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: DebugLogGoldSourcesModel) {
		super.reader(dvr, payload);

		payload.message = dvr.readStringNullTerminated(512);
	}

	static writer(dvr: RelativeDataView, payload: DebugLogGoldSourcesModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.message, 512);
	}
}
