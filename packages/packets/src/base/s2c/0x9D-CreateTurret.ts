import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type CreateTurretModel = BasePacketModel & {
	objectNetId: number,
	netNodeId: number,
	name: string,
	isTargetable: boolean,
	unknown1: boolean,
	unknown2: boolean,
	isTargetableToTeam: number,
};

export default class CreateTurret extends BasePacket {
	static create(payload: Partial<CreateTurretModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isTargetable: 1,
	};

	static reader(dvr: RelativeDataView, payload: CreateTurretModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.name = dvr.readCharArray(64);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isTargetable = bitfield1.isTargetable;

		payload.isTargetableToTeam = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: CreateTurretModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		dvr.writeCharArray(payload.name, 64);

		dvr.writeBitfield(this.bitfield1, {
			isTargetable: payload.isTargetable,
		});

		dvr.writeUint32(payload.isTargetableToTeam);
	}
}
