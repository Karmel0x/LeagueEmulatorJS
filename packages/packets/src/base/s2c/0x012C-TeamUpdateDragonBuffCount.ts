import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type TeamUpdateDragonBuffCountModel = ExtendedPacketModel & {
	teamIsOrder: boolean,
	unknown1: number,
	count: number,
};

export default class TeamUpdateDragonBuffCount extends ExtendedPacket {
	static create(payload: Partial<TeamUpdateDragonBuffCountModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		teamIsOrder: 1,
	};

	static reader(dvr: RelativeDataView, payload: TeamUpdateDragonBuffCountModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.teamIsOrder = bitfield1.teamIsOrder;

		payload.unknown1 = dvr.readUint32();
		payload.count = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: TeamUpdateDragonBuffCountModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			teamIsOrder: payload.teamIsOrder,
		});

		dvr.writeUint32(payload.unknown1);
		dvr.writeUint32(payload.count);
	}
}
