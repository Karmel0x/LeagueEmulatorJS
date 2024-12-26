import PrimaryPacket, { PrimaryPacketModel } from '@repo/network/packets/primary-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId, NetId } from '../types/player';


export enum ChatType {
	all,
	team,
	private,
};

export type ChatModel = PrimaryPacketModel & {
	clientId: ClientId,
	netId: NetId,
	chatType: ChatType,
	param?: string,
	message: string,
};

/**
 * @todo localized strings
 */
export default class Chat extends PrimaryPacket {
	static create(payload: Partial<ChatModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ChatModel) {
		super.reader(dvr, payload);

		payload.clientId = dvr.readUint32();
		payload.netId = dvr.readUint32();

		let useLocalization = dvr.readBool();
		payload.chatType = dvr.readUint32();

		let paramSize = dvr.readUint32();
		let messageSize = dvr.readUint32();

		payload.param = dvr.readCharArray(32).slice(0, paramSize);
		payload.message = dvr.readCharArray(messageSize);
	}

	static writer(dvr: RelativeDataView, payload: ChatModel) {
		if (!payload.message)
			return;

		super.writer(dvr, payload);

		dvr.writeUint32(payload.clientId);
		dvr.writeUint32(payload.netId);

		let useLocalization = false;
		dvr.writeBool(useLocalization);
		dvr.writeUint32(payload.chatType);

		let param = payload.param || '';
		let message = payload.message || '';

		dvr.writeUint32(param.length);
		dvr.writeUint32(message.length);

		dvr.writeCharArray(param, 32);
		dvr.writeStringNullTerminated(message, 256);
	}
}
