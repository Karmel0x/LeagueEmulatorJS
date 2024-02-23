import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export enum StatEvent {
	nodeCapture = 0x0,
	nodeNeutralize = 0x1,
	nodeKillOffense = 0x2,
	teamObjective = 0x3,
	defendPointNeutralize = 0x4,
	nodeKillDefense = 0x5,
	nodeTimeDefense = 0x6,
	lastStand = 0x7,
	nodeCaptureAssist = 0x8,
	nodeNeutralizeAssist = 0x9,
};

export type IncrementPlayerStatModel = BasePacketModel & {
	playerNetId: NetId,
	statEvent: StatEvent,
};

export default class IncrementPlayerStat extends BasePacket {
	static create(payload: Partial<IncrementPlayerStatModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: IncrementPlayerStatModel) {
		super.reader(dvr, payload);

		payload.playerNetId = dvr.readUint32();
		payload.statEvent = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: IncrementPlayerStatModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.playerNetId);
		dvr.writeUint8(payload.statEvent);
	}
}
