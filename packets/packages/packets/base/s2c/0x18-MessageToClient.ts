import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum FloatTextType {
	invulnerable = 0x0,
	first = 0x0,
	special = 0x1,
	heal = 0x2,
	manaHeal = 0x3,
	manaDamage = 0x4,
	dodge = 0x5,
	critical = 0x6,
	magicCritical = 0x7,
	experience = 0x8,
	gold = 0x9,
	level = 0xa,
	disable = 0xb,
	questReceived = 0xc,
	questComplete = 0xd,
	score = 0xe,
	physicalDamage = 0xf,
	magicalDamage = 0x10,
	trueDamage = 0x11,
	enemyPhysicalDamage = 0x12,
	enemyMagicalDamage = 0x13,
	enemyTrueDamage = 0x14,
	enemyCritical = 0x15,
	countdown = 0x16,
	omw = 0x17,
	absorbed = 0x18,
	debug = 0x19,
	//max = 0x1a,
};

export type MessageToClientModel = BasePacketModel & {
	bubbleDelay: number,
	slotNumber: number,
	isError: boolean,
	colorIndex: number,
	floatingTextType: FloatTextType,
	message: string,
};

export default class MessageToClient extends BasePacket {
	static create(payload: Partial<MessageToClientModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: MessageToClientModel) {
		super.reader(dvr, payload);

		payload.bubbleDelay = dvr.readFloat();
		payload.slotNumber = dvr.readInt32();
		payload.isError = dvr.readBool();
		payload.colorIndex = dvr.readUint8();
		payload.floatingTextType = dvr.readUint32();

		payload.message = dvr.readString();
	}

	static writer(dvr: RelativeDataView, payload: MessageToClientModel) {
		super.writer(dvr, payload);

		dvr.writeFloat(payload.bubbleDelay);
		dvr.writeInt32(payload.slotNumber);
		dvr.writeBool(payload.isError);
		dvr.writeUint8(payload.colorIndex);
		dvr.writeUint32(payload.floatingTextType);

		//if (payload.message && payload.message.length > 1024)
		//	payload.message = payload.message.substring(0, 1024);

		dvr.writeString(payload.message);
	}
}
