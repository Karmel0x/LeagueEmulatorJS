import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type PlayThemeMusicModel = BasePacketModel & {
	sourceNetId: NetId,
	musicId: number,
};

export default class PlayThemeMusic extends BasePacket {
	static create(payload: Partial<PlayThemeMusicModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: PlayThemeMusicModel) {
		super.reader(dvr, payload);

		payload.sourceNetId = dvr.readUint32();
		payload.musicId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: PlayThemeMusicModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.sourceNetId);
		dvr.writeUint32(payload.musicId);
	}
}
