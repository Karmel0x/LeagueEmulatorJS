import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export enum EmitterGroupOperation {
	setEmissionPaused = 0,
};

export type ChangeEmitterGroupModel = BasePacketModel & {
	groupName: string,
	operationData: number,
	groupOperation: EmitterGroupOperation,
};

export default class ChangeEmitterGroup extends BasePacket {
	static create(payload: Partial<ChangeEmitterGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ChangeEmitterGroupModel) {
		super.reader(dvr, payload);

		payload.groupName = dvr.readCharArray(256);
		payload.operationData = dvr.readInt32();
		payload.groupOperation = dvr.readUint8();//readInt32
	}

	static writer(dvr: RelativeDataView, payload: ChangeEmitterGroupModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.groupName, 256);
		dvr.writeInt32(payload.operationData);
		dvr.writeUint8(payload.groupOperation);//writeInt32
	}
}
