import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { type SVector2Model } from '../../shared/SVector2';
import type { NetId } from '../../types/player';

export enum PingCategory {
	command = 0x0,
	charge = 0x1,
	danger = 0x2,
	mia = 0x3,
	omw = 0x4,
	getback = 0x5,
	comehere = 0x6,
};

export enum PingEventStringType {
	offenseMarkChampion = 0x0,
	offenseMarkLocation = 0x1,
	offenseDefendLocation = 0x2,
	dangerFallBackGround = 0x3,
	dangerFallBack = 0x4,
	dangerLeaveChampion = 0x5,
	dangerLeaveLocation = 0x6,
	dangerAbandonLocation = 0x7,
	pingThrottled = 0x8,
	generalMia = 0x9,
	generalOmw = 0xa,
	generalGetBack = 0xb,
	generalComeHere = 0xc,
};

export enum PingTargetType {
	neutral = 0x0,
	friendly = 0x1,
	enemy = 0x2,
	orderSpectator = 0x3,
	chaosSpectator = 0x4,
	orderSpectatorColorblind = 0x5,
	chaosSpectatorColorblind = 0x6,
};

export enum PingCategoryForStats {
	command = 0x0,
	attackTarget = 0x1,
	defendTarget = 0x2,
	caution = 0x3,
	backAwayFromEnemy = 0x4,
	teammateBeCareful = 0x5,
	mia = 0x6,
	omw = 0x7,
	danger = 0x8,
	assist = 0x9,
};

export type MapPingModel = BasePacketModel & {
	position: SVector2Model,
	targetNetId: NetId,
	sourceNetId: NetId,
	category: PingCategory,
	playAudio: boolean,
	showChat: boolean,
	throttled: boolean,
	playVO: boolean,
};

export default class MapPing extends BasePacket {
	static create(payload: Partial<MapPingModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		playAudio: 1 << 0,
		showChat: 1 << 1,
		throttled: 1 << 2,
		playVO: 1 << 3,
	};

	static reader(dvr: RelativeDataView, payload: MapPingModel) {
		super.reader(dvr, payload);

		payload.position = SVector2.read(dvr);
		payload.targetNetId = dvr.readUint32();
		payload.sourceNetId = dvr.readUint32();
		payload.category = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.playAudio = bitfield1.playAudio;
		payload.showChat = bitfield1.showChat;
		payload.throttled = bitfield1.throttled;
		payload.playVO = bitfield1.playVO;
	}

	static writer(dvr: RelativeDataView, payload: MapPingModel) {
		super.writer(dvr, payload);

		SVector2.writer(dvr, payload.position);
		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint32(payload.sourceNetId);
		dvr.writeUint8(payload.category);

		dvr.writeBitfield(this.bitfield1, {
			playAudio: payload.playAudio,
			showChat: payload.showChat,
			throttled: payload.throttled,
			playVO: payload.playVO,
		});
	}
}
