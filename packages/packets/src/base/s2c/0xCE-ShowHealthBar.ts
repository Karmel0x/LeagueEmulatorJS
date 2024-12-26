import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { TeamId } from '../../types/team';

export enum HealthBarType {
	invalid = 0,
	minion = 1,
	hero = 2,
}

export type ShowHealthBarModel = BasePacketModel & ({
	show: boolean,
	type: HealthBarType,
	observerTeamId?: TeamId,
});

export default class ShowHealthBar extends BasePacket {
	static create(payload: Partial<ShowHealthBarModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		show: 1,
		change: 2,
	};

	static reader(dvr: RelativeDataView, payload: ShowHealthBarModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.show = bitfield1.show;
		let change = bitfield1.change;

		payload.type = dvr.readUint8();

		if (change)
			payload.observerTeamId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ShowHealthBarModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			show: payload.show,
			change: !!payload.observerTeamId,
		});

		dvr.writeUint8(payload.type);

		if (payload.observerTeamId)
			dvr.writeUint32(payload.observerTeamId);
	}
}
