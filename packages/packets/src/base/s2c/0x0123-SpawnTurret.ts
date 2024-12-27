import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type SpawnTurretModel = ExtendedPacketModel & {
	objectNetId: NetId,
	ownerNetId: NetId,
	netNodeId: number,
	name: string,
	skinName: string,
	skinId: number,
	position: SVector3Model,
	modelDisappearOnDeathTime: number,
	isInvulnerable: boolean,
	isTargetable: boolean,
	team: TeamId,
	isTargetableToTeam: number,
};

export default class SpawnTurret extends ExtendedPacket {
	static create(payload: Partial<SpawnTurretModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isInvulnerable: 1,
		isTargetable: 2,
	};

	static reader(dvr: RelativeDataView, payload: SpawnTurretModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.ownerNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.name = dvr.readCharArray(64);
		payload.skinName = dvr.readCharArray(64);
		payload.skinId = dvr.readInt32();
		payload.position = SVector3.read(dvr);
		payload.modelDisappearOnDeathTime = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isInvulnerable = bitfield1.isInvulnerable;
		payload.isTargetable = bitfield1.isTargetable;

		payload.team = dvr.readUint16();
		payload.isTargetableToTeam = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: SpawnTurretModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint32(payload.ownerNetId);
		dvr.writeUint8(payload.netNodeId);
		dvr.writeCharArray(payload.name, 64);
		dvr.writeCharArray(payload.skinName, 64);
		dvr.writeInt32(payload.skinId);
		SVector3.writer(dvr, payload.position);
		dvr.writeFloat(payload.modelDisappearOnDeathTime);

		dvr.writeBitfield(this.bitfield1, {
			isInvulnerable: payload.isInvulnerable,
			isTargetable: payload.isTargetable,
		});

		dvr.writeUint16(payload.team);
		dvr.writeUint32(payload.isTargetableToTeam);
	}
}
