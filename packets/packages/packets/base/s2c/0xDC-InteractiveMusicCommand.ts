import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum InteractiveMusicCommandType {
	prepareCue = 0x0,
	beginCue = 0x1,
	endCue = 0x2,
	stateChange = 0x3,
};

export type InteractiveMusicCommandModel = BasePacketModel & {
	command: InteractiveMusicCommandType,
	eventId: number,
	paramId: number,
};

export default class InteractiveMusicCommand extends BasePacket {
	static create(payload: Partial<InteractiveMusicCommandModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: InteractiveMusicCommandModel) {
		super.reader(dvr, payload);

		payload.command = dvr.readUint8();
		payload.eventId = dvr.readUint32();
		payload.paramId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: InteractiveMusicCommandModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.command);
		dvr.writeUint32(payload.eventId);
		dvr.writeUint32(payload.paramId);
	}
}
