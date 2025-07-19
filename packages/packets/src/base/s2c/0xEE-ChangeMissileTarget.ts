import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export type ChangeMissileTargetModel = BasePacketModel & {
	targetNetId: NetId,
	targetPosition: SVector3Model,
};

export default class ChangeMissileTarget extends BasePacket {
	static create(payload: Partial<ChangeMissileTargetModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ChangeMissileTargetModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.targetPosition = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: ChangeMissileTargetModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		SVector3.writer(dvr, payload.targetPosition);
	}
}
