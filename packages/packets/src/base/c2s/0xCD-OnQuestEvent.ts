import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type OnQuestEventModel = BasePacketModel & {
	questEvent: number,
	questId: number,
};

export default class OnQuestEvent extends BasePacket {
	static create(payload: Partial<OnQuestEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: OnQuestEventModel) {
		super.reader(dvr, payload);

		payload.questEvent = dvr.readUint8();
		payload.questId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: OnQuestEventModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.questEvent);
		dvr.writeUint32(payload.questId);
	}
}
