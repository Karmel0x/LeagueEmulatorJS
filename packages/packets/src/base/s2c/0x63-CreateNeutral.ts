import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export enum MinionRoamState {
	inactive = 0,
	hostile = 1,
	runInFear = 2,
}

export type CreateNeutralModel = BasePacketModel & {
	objectNetId: NetId,
	netNodeId: number,
	position: SVector3Model,
	groupPosition: SVector3Model,
	faceDirectionPosition: SVector3Model,
	name: string,
	skinName: string,
	uniqueName: string,
	spawnAnimationName: string,
	team: TeamId,
	damageBonus: number,
	healthBonus: number,
	minionRoamState: MinionRoamState,
	groupNumber: number,
	buffSideTeamId: number,
	revealEvent: number,
	initialLevel: number,
	spawnDuration: number,
	spawnTime: number,
	behaviorTree: number,
	aiScript: string,
};

export default class CreateNeutral extends BasePacket {
	static create(payload: Partial<CreateNeutralModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: CreateNeutralModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.groupPosition = SVector3.read(dvr);
		payload.faceDirectionPosition = SVector3.read(dvr);
		payload.name = dvr.readCharArray(64);
		payload.skinName = dvr.readCharArray(64);
		payload.uniqueName = dvr.readCharArray(64);
		payload.spawnAnimationName = dvr.readCharArray(64);
		payload.team = dvr.readInt32();
		payload.damageBonus = dvr.readInt32();
		payload.healthBonus = dvr.readInt32();
		payload.minionRoamState = dvr.readUint32();
		payload.groupNumber = dvr.readInt32();
		payload.buffSideTeamId = dvr.readInt32();
		payload.revealEvent = dvr.readInt32();
		payload.initialLevel = dvr.readInt32();
		payload.spawnDuration = dvr.readFloat();
		payload.spawnTime = dvr.readFloat();
		payload.behaviorTree = dvr.readUint8();
		payload.aiScript = dvr.readStringNullTerminated(32);
	}

	static writer(dvr: RelativeDataView, payload: CreateNeutralModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.groupPosition);
		SVector3.writer(dvr, payload.faceDirectionPosition);
		dvr.writeCharArray(payload.name, 64);
		dvr.writeCharArray(payload.skinName, 64);
		dvr.writeCharArray(payload.uniqueName, 64);
		dvr.writeCharArray(payload.spawnAnimationName, 64);
		dvr.writeInt32(payload.team);
		dvr.writeInt32(payload.damageBonus);
		dvr.writeInt32(payload.healthBonus);
		dvr.writeUint32(payload.minionRoamState);
		dvr.writeInt32(payload.groupNumber);
		dvr.writeInt32(payload.buffSideTeamId);
		dvr.writeInt32(payload.revealEvent);
		dvr.writeInt32(payload.initialLevel);
		dvr.writeFloat(payload.spawnDuration);
		dvr.writeFloat(payload.spawnTime);
		dvr.writeUint8(payload.behaviorTree);
		dvr.writeStringNullTerminated(payload.aiScript, 32);
	}
}