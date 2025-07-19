import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type IncrementMinionKillsModel = ExtendedPacketModel & {
	playerNetId: NetId,
};

export default class IncrementMinionKills extends ExtendedPacket {
	static create(payload: Partial<IncrementMinionKillsModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: IncrementMinionKillsModel) {
		super.reader(dvr, payload);

		payload.playerNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: IncrementMinionKillsModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.playerNetId);
	}
}
