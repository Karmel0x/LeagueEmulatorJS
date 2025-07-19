import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type TutorialAudioEventFinishedModel = BasePacketModel & {
	audioEventNetId: NetId,
};

export default class TutorialAudioEventFinished extends BasePacket {
	static create(payload: Partial<TutorialAudioEventFinishedModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: TutorialAudioEventFinishedModel) {
		super.reader(dvr, payload);

		payload.audioEventNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: TutorialAudioEventFinishedModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.audioEventNetId);
	}
}
