import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type ChainMissileSyncModel = BasePacketModel & {
	ownerNetId: NetId,
	/** max count = 32 */
	targetNetIds: NetId[],
};

export default class ChainMissileSync extends BasePacket {
	static create(payload: ChainMissileSyncModel) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ChainMissileSyncModel) {
		super.reader(dvr, payload);

		let count = dvr.readInt32();
		payload.ownerNetId = dvr.readUint32();
		payload.targetNetIds = dvr.readArray(() => dvr.readUint32(), count);
	}

	static writer(dvr: RelativeDataView, payload: ChainMissileSyncModel) {
		if (!payload.targetNetIds || payload.targetNetIds.length < 1)
			return;

		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetIds.length);
		dvr.writeUint32(payload.ownerNetId);
		payload.targetNetIds.forEach(targetNetId => {
			dvr.writeUint32(targetNetId);
		});
	}
}