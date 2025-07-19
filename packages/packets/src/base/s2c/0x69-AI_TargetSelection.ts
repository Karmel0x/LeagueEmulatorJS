import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type AI_TargetSelectionModel = BasePacketModel & {
	/** max count = 5 */
	targetNetIds: NetId[],
};

export default class AI_TargetSelection extends BasePacket {
	static create(payload: Partial<AI_TargetSelectionModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AI_TargetSelectionModel) {
		super.reader(dvr, payload);

		payload.targetNetIds = dvr.readArray(() => dvr.readUint32(), 5);
	}

	static writer(dvr: RelativeDataView, payload: AI_TargetSelectionModel) {
		super.writer(dvr, payload);

		dvr.writeArray(payload.targetNetIds, id => dvr.writeUint32(id), 5);
	}
}
