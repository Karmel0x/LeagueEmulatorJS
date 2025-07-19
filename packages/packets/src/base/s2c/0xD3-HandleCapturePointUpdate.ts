import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum CapturePointUpdateCommand {
	attackCapturePoint = 0,
	setAttacker = 1,
};

export type HandleCapturePointUpdateModel = BasePacketModel & {
	capturePointId: number,
	otherNetId: NetId,
	parType: number,
	attackTeam: number,
	command: CapturePointUpdateCommand,
};

/**
 * Used for dominion game mode
 */
export default class HandleCapturePointUpdate extends BasePacket {
	static create(payload: Partial<HandleCapturePointUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: HandleCapturePointUpdateModel) {
		super.reader(dvr, payload);

		payload.capturePointId = dvr.readUint8();
		payload.otherNetId = dvr.readUint32();
		payload.parType = dvr.readUint8();
		payload.attackTeam = dvr.readInt32();
		payload.command = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: HandleCapturePointUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.capturePointId);
		dvr.writeUint32(payload.otherNetId);
		dvr.writeUint8(payload.parType);
		dvr.writeInt32(payload.attackTeam);
		dvr.writeUint8(payload.command);
	}
}
