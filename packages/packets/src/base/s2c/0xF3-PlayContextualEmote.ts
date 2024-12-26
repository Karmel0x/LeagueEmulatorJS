import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import { Emote } from '../c2s/0x48-PlayEmote';

export type PlayContextualEmoteModel = BasePacketModel & {
	emoteId: Emote,
	hashedParam: number,
	emoteFlags: number,
};

export default class PlayContextualEmote extends BasePacket {
	static create(payload: Partial<PlayContextualEmoteModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PlayContextualEmoteModel) {
		super.reader(dvr, payload);

		payload.emoteId = dvr.readUint8();
		payload.hashedParam = dvr.readUint32();
		payload.emoteFlags = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: PlayContextualEmoteModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.emoteId);
		dvr.writeUint32(payload.hashedParam);
		dvr.writeUint8(payload.emoteFlags);
	}
}
