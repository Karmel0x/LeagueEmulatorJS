import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type SpawnMinionModel = BasePacketModel & {
	objectNetId: NetId,
	ownerNetId: NetId,
	netNodeId: number,
	position: SVector3Model,
	skinId: number,
	cloneNetId: NetId,
	team: TeamId,
	ignoreCollision: boolean,
	isWard: boolean,
	isLaneMinion: boolean,
	isBot: boolean,
	isTargetable: boolean,
	isTargetableToTeam: number,
	visibilitySize: number,
	name: string,
	skinName: string,
	initialLevel: number,
	onlyVisibleToNetId: NetId,
};

export default class SpawnMinion extends BasePacket {
	static create(payload: Partial<SpawnMinionModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		ignoreCollision: 1 << 0,
		isWard: 1 << 1,
		isLaneMinion: 1 << 2,
		isBot: 1 << 3,
		isTargetable: 1 << 4,
	};

	static reader(dvr: RelativeDataView, payload: SpawnMinionModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.ownerNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.skinId = dvr.readInt32();
		payload.cloneNetId = dvr.readUint32();
		payload.team = dvr.readUint16();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.ignoreCollision = bitfield1.ignoreCollision;
		payload.isWard = bitfield1.isWard;
		payload.isLaneMinion = bitfield1.isLaneMinion;
		payload.isBot = bitfield1.isBot;
		payload.isTargetable = bitfield1.isTargetable;

		payload.isTargetableToTeam = dvr.readUint32();
		payload.visibilitySize = dvr.readFloat();
		payload.name = dvr.readCharArray(64);
		payload.skinName = dvr.readCharArray(64);
		payload.initialLevel = dvr.readUint16();
		payload.onlyVisibleToNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: SpawnMinionModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint32(payload.ownerNetId);
		dvr.writeUint8(payload.netNodeId);
		SVector3.writer(dvr, payload.position);
		dvr.writeInt32(payload.skinId);
		dvr.writeUint32(payload.cloneNetId);
		dvr.writeUint16(payload.team);

		dvr.writeBitfield(this.bitfield1, {
			ignoreCollision: payload.ignoreCollision,
			isWard: payload.isWard,
			isLaneMinion: payload.isLaneMinion,
			isBot: payload.isBot,
			isTargetable: payload.isTargetable,
		});

		dvr.writeUint32(payload.isTargetableToTeam);
		dvr.writeFloat(payload.visibilitySize);
		dvr.writeCharArray(payload.name, 64);
		dvr.writeCharArray(payload.skinName, 64);
		dvr.writeUint16(payload.initialLevel);
		dvr.writeUint32(payload.onlyVisibleToNetId);
	}
}
