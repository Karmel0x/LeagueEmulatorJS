import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export enum TipCommands {
	activate = 0,
	remove = 1,
	enableEvents = 2,
	disableEvents = 3,
	activateDialogue = 4,
	enableDialogueEvents = 5,
	disableDialogueEvents = 6,
}

export type HandleTipUpdateModel = BasePacketModel & {
	name: string,
	other: string,
	imagePath: string,
	command: TipCommands,
	id: number,
};

export default class HandleTipUpdate extends BasePacket {
	static create(payload: Partial<HandleTipUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HandleTipUpdateModel) {
		super.reader(dvr, payload);

		payload.name = dvr.readCharArray(128);
		payload.other = dvr.readCharArray(128);
		payload.imagePath = dvr.readCharArray(128);
		payload.command = dvr.readUint8();
		payload.id = dvr.readInt32();//readUint32
	}

	static writer(dvr: RelativeDataView, payload: HandleTipUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.name, 128);
		dvr.writeCharArray(payload.other, 128);
		dvr.writeCharArray(payload.imagePath, 128);
		dvr.writeUint8(payload.command);
		dvr.writeInt32(payload.id);//writeUint32
	}
}
