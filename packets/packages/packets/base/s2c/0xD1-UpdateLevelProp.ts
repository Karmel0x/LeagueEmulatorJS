import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export enum PopCommand {
	playAnimation = 0,
	setParticleValue = 1,
	changeSkin = 2,
};

export type UpdateLevelPropModel = BasePacketModel & {
	stringParam1: string,
	floatParam1: number,
	floatParam2: number,
	objectNetId: NetId,
	flags1: number,
	command: PopCommand,
	byteParam1: number,
	byteParam2: number,
	byteParam3: number,
};

export default class UpdateLevelProp extends BasePacket {
	static create(payload: Partial<UpdateLevelPropModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpdateLevelPropModel) {
		super.reader(dvr, payload);

		payload.stringParam1 = dvr.readCharArray(64);
		payload.floatParam1 = dvr.readFloat();
		payload.floatParam2 = dvr.readFloat();
		payload.objectNetId = dvr.readUint32();
		payload.flags1 = dvr.readUint32();
		payload.command = dvr.readUint32();
		payload.byteParam1 = dvr.readUint8();
		payload.byteParam2 = dvr.readUint8();
		payload.byteParam3 = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: UpdateLevelPropModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.stringParam1, 64);
		dvr.writeFloat(payload.floatParam1);
		dvr.writeFloat(payload.floatParam2);
		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint32(payload.flags1);
		dvr.writeUint32(payload.command);
		dvr.writeUint8(payload.byteParam1);
		dvr.writeUint8(payload.byteParam2);
		dvr.writeUint8(payload.byteParam3);
	}
}
