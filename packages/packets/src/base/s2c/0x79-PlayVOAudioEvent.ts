import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum AudioCallbackType {
	none = 0x0,
	lua = 0x1,
	behaviorTree = 0x2,
};

export enum AudioEventType {
	standard = 0x0,
	evoSummonerPlatform = 0x1,
};

export type PlayVOAudioEventModel = BasePacketModel & {
	folderName: string,
	eventId: string,
	callbackType: AudioCallbackType,
	audioEventType: AudioEventType,
	audioEventNetId: NetId,
};

export default class PlayVOAudioEvent extends BasePacket {
	static create(payload: Partial<PlayVOAudioEventModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PlayVOAudioEventModel) {
		super.reader(dvr, payload);

		payload.folderName = dvr.readCharArray(64);
		payload.eventId = dvr.readCharArray(64);
		payload.callbackType = dvr.readUint8();
		payload.audioEventType = dvr.readUint8();
		payload.audioEventNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: PlayVOAudioEventModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.folderName, 64);
		dvr.writeCharArray(payload.eventId, 64);
		dvr.writeUint8(payload.callbackType);
		dvr.writeUint8(payload.audioEventType);
		dvr.writeUint32(payload.audioEventNetId);
	}
}
