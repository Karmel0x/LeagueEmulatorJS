import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type SpawnBotModel = BasePacketModel & {
	objectNetId: NetId,
	netNodeId: number,
	position: SVector3Model,
	botRank: number,
	team: TeamId,
	skinId: number,
	name: string,
	skinName: string,
};

export default class SpawnBot extends BasePacket {
	static create(payload: Partial<SpawnBotModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: SpawnBotModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.botRank = dvr.readUint8();
		payload.team = dvr.readUint16();//(bitfield16 & 0x1FF)
		payload.skinId = dvr.readInt32();
		payload.name = dvr.readCharArray(64);
		payload.skinName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: SpawnBotModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		SVector3.writer(dvr, payload.position);
		dvr.writeUint8(payload.botRank);
		dvr.writeUint16(payload.team);
		dvr.writeInt32(payload.skinId);
		dvr.writeCharArray(payload.name, 64);
		dvr.writeStringNullTerminated(payload.skinName, 64);
	}
}