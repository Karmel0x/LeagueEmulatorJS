import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type Building_DieModel = BasePacketModel & {
	killerNetId: NetId,
	lastHeroNetId: NetId,
};

export default class Building_Die extends BasePacket {
	static create(payload: Partial<Building_DieModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Building_DieModel) {
		super.reader(dvr, payload);

		payload.killerNetId = dvr.readUint32();
		payload.lastHeroNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: Building_DieModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.killerNetId);
		dvr.writeUint32(payload.lastHeroNetId);
	}
}
