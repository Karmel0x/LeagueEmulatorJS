import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type PlaySoundModel = BasePacketModel & {
	name: string,
	ownerNetId: NetId,
};

export default class PlaySound extends BasePacket {
	static create(payload: Partial<PlaySoundModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PlaySoundModel) {
		super.reader(dvr, payload);

		payload.name = dvr.readCharArray(1024);
		payload.ownerNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: PlaySoundModel) {
		super.writer(dvr, payload);

		dvr.writeCharArray(payload.name, 1024);
		dvr.writeUint32(payload.ownerNetId);
	}
}
