import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export type UpdateBounceMissileModel = ExtendedPacketModel & {
	targetNetId: NetId,
	casterPosition: SVector3Model,
};

export default class UpdateBounceMissile extends ExtendedPacket {
	static create(payload: Partial<UpdateBounceMissileModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UpdateBounceMissileModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.casterPosition = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: UpdateBounceMissileModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		SVector3.writer(dvr, payload.casterPosition);
	}
}
