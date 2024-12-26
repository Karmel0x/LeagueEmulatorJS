import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type ForceCreateMissileModel = BasePacketModel & {
	missileNetId: NetId,
};

export default class ForceCreateMissile extends BasePacket {
	static create(payload: Partial<ForceCreateMissileModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ForceCreateMissileModel) {
		super.reader(dvr, payload);

		payload.missileNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ForceCreateMissileModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.missileNetId);
	}
}