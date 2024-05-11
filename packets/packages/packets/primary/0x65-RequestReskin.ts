import PrimaryPacket, { PrimaryPacketModel } from '@workspace/network/packages/packets/primary-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { PlayerId } from '../types/player';

export type RequestReskinModel = PrimaryPacketModel & {
	playerId: PlayerId,
	skinId: number,
	skinName: string,
};

export default class RequestReskin extends PrimaryPacket {
	static create(payload: Partial<RequestReskinModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RequestReskinModel) {
		super.reader(dvr, payload);

		dvr.readCharArray(7);
		payload.playerId = dvr.readInt64();
		payload.skinId = dvr.readInt32();
		payload.skinName = dvr.readString();
	}

	static writer(dvr: RelativeDataView, payload: RequestReskinModel) {
		if (!payload.skinName)
			return;

		super.writer(dvr, payload);

		dvr.writeCharArray('', 7);
		dvr.writeInt64(payload.playerId);
		dvr.writeInt32(payload.skinId);

		let skinName = payload.skinName;
		if (skinName.length > 128)
			skinName = skinName.substring(0, 128);
		else skinName += '\0';

		dvr.writeString(skinName);
	}
}
