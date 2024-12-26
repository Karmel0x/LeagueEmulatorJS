import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type MessageToClient_MapViewModel = ExtendedPacketModel & {
	bubbleDelay: number,
	slotNumber: number,
	isError: boolean,
	colorIndex: number,
	floatTextType: number,
	message: string,
};

export default class MessageToClient_MapView extends ExtendedPacket {
	static create(payload: Partial<MessageToClient_MapViewModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: MessageToClient_MapViewModel) {
		super.reader(dvr, payload);

		payload.bubbleDelay = dvr.readFloat();
		payload.slotNumber = dvr.readInt32();
		payload.isError = dvr.readBool();
		payload.colorIndex = dvr.readUint8();
		payload.floatTextType = dvr.readUint32();
		payload.message = dvr.readString();
	}

	static writer(dvr: RelativeDataView, payload: MessageToClient_MapViewModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.bubbleDelay);
		dvr.writeInt32(payload.slotNumber);
		dvr.writeBool(payload.isError);
		dvr.writeUint8(payload.colorIndex);
		dvr.writeUint32(payload.floatTextType);
		dvr.writeString(payload.message);
	}
}
