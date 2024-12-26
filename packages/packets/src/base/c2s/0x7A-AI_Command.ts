import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type AI_CommandModel = BasePacketModel & {
	command: string,
};

export default class AI_Command extends BasePacket {
	static create(payload: Partial<AI_CommandModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AI_CommandModel) {
		super.reader(dvr, payload);

		payload.command = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: AI_CommandModel) {
		super.writer(dvr, payload);

		dvr.writeStringNullTerminated(payload.command, 128);
	}
}
