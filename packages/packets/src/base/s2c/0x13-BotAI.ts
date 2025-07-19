import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type BotAIModel = BasePacketModel & {
	name: string,
	strategy: string,
	behaviour: string,
	task: string,
	states: {
		0: string,
		1: string,
		2: string,
	},
};

export default class BotAI extends BasePacket {
	static create(payload: Partial<BotAIModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: BotAIModel) {
		super.reader(dvr, payload);

		payload.name = dvr.readCharArray(64);
		payload.strategy = dvr.readCharArray(64);
		payload.behaviour = dvr.readCharArray(64);
		payload.task = dvr.readCharArray(64);

		payload.states = {
			0: dvr.readCharArray(64),
			1: dvr.readCharArray(64),
			2: dvr.readStringNullTerminated(64),
		};
	}

	static writer(dvr: RelativeDataView, payload: BotAIModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.name, 64);
		dvr.writeCharArray(payload.strategy, 64);
		dvr.writeCharArray(payload.behaviour, 64);
		dvr.writeCharArray(payload.task, 64);

		payload.states = payload.states || {};
		dvr.writeCharArray(payload.states[0], 64);
		dvr.writeCharArray(payload.states[1], 64);
		dvr.writeStringNullTerminated(payload.states[2], 64);
	}
}
