import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { type SVector3Model } from '../../shared/SVector3';
import type { ClientId } from '../../types/player';
import type { TeamId } from '../../types/team';

export enum RespawnPointCommand {
	updateRespawnPoint = 0,
	setSelectedRespawnPoint = 1,
	setVisible = 2,
};

export enum RespawnPointEvent {
	mouseDown = 0,
	mouseUp = 1,
};

export type HandleRespawnPointUpdateModel = BasePacketModel & {
	respawnPointCommand: RespawnPointCommand,
	respawnPointUiId: number,
	team: TeamId,
	clientId: ClientId,
	position: SVector3Model,
};

export default class HandleRespawnPointUpdate extends BasePacket {
	static create(payload: Partial<HandleRespawnPointUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HandleRespawnPointUpdateModel) {
		super.reader(dvr, payload);

		payload.respawnPointCommand = dvr.readUint8();
		payload.respawnPointUiId = dvr.readUint8();
		payload.team = dvr.readUint32();
		payload.clientId = dvr.readInt32();
		payload.position = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: HandleRespawnPointUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.respawnPointCommand);
		dvr.writeUint8(payload.respawnPointUiId);
		dvr.writeUint32(payload.team);
		dvr.writeInt32(payload.clientId);
		SVector3.writer(dvr, payload.position);
	}
}
