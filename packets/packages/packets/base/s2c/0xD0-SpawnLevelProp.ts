import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export enum LevelPropType {
	ai = 0,
	gameObject = 1,
};

export type SpawnLevelPropModel = BasePacketModel & {
	objectNetId: NetId,
	netNodeId: number,
	skinId: number,
	position: SVector3Model,
	facingDirection: SVector3Model,
	positionOffset: SVector3Model,
	scale: SVector3Model,
	team: TeamId,
	rank: number,
	skillLevel: number,
	type: LevelPropType,
	name: string,
	propName: string,
};

export default class SpawnLevelProp extends BasePacket {
	static create(payload: Partial<SpawnLevelPropModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpawnLevelPropModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.skinId = dvr.readInt32();
		payload.position = SVector3.read(dvr);
		payload.facingDirection = SVector3.read(dvr);
		payload.positionOffset = SVector3.read(dvr);
		payload.scale = SVector3.read(dvr);
		payload.team = dvr.readUint16();// bitfield16
		payload.rank = dvr.readUint8();
		payload.skillLevel = dvr.readUint8();
		payload.type = dvr.readUint8();
		payload.name = dvr.readCharArray(64);
		payload.propName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: SpawnLevelPropModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		dvr.writeInt32(payload.skinId);
		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.facingDirection);
		SVector3.writer(dvr, payload.positionOffset);
		SVector3.writer(dvr, payload.scale);
		dvr.writeUint16(payload.team);
		dvr.writeUint8(payload.rank);
		dvr.writeUint8(payload.skillLevel);
		dvr.writeUint8(payload.type);
		dvr.writeCharArray(payload.name, 64);
		dvr.writeStringNullTerminated(payload.propName, 64);
	}
}
