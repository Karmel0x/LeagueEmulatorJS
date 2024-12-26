import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export enum LookAtType {
	direction = 0,
	location = 1,
	unit = 2,
}

export type UnitSetLookAtModel = ExtendedPacketModel & {
	type: LookAtType,
	targetPosition: SVector3Model,
	targetNetId: NetId,
};

export default class UnitSetLookAt extends ExtendedPacket {
	static create(payload: Partial<UnitSetLookAtModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetLookAtModel) {
		super.reader(dvr, payload);

		payload.type = dvr.readUint8();
		payload.targetPosition = SVector3.read(dvr);
		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetLookAtModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.type);
		SVector3.writer(dvr, payload.targetPosition);
		dvr.writeUint32(payload.targetNetId);
	}
}
