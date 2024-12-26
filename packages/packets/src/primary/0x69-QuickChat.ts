import PrimaryPacket, { PrimaryPacketModel } from '@repo/network/packets/primary-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId } from '../types/player';


export type QuickChatModel = PrimaryPacketModel & {
	clientId: ClientId,
	messageId: number,
};

export default class QuickChat extends PrimaryPacket {
	static create(payload: Partial<QuickChatModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: QuickChatModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
		payload.messageId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: QuickChatModel) {
		if (!payload.messageId)
			return;

		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
		dvr.writeUint32(payload.messageId);
	}
}
