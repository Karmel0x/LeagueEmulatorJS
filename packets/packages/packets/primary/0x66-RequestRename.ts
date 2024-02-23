import PrimaryPacket, { PrimaryPacketModel } from '@workspace/network/packages/packets/primary-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { PlayerId } from '../types/player';

export type RequestRenameModel = PrimaryPacketModel & {
	playerId: PlayerId,
	skinId: number,
	playerName: string,
};

export default class RequestRename extends PrimaryPacket {
	static create(payload: Partial<RequestRenameModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: RequestRenameModel) {
		super.reader(dvr, payload);

		payload.playerId = dvr.readInt64();
		payload.skinId = dvr.readInt32();
		payload.playerName = dvr.readString();
	}

	static writer(dvr: RelativeDataView, payload: RequestRenameModel) {
		if (!payload.playerName)
			return;

		super.writer(dvr, payload);

		dvr.writeInt64(payload.playerId);
		dvr.writeInt32(payload.skinId);

		let playerName = payload.playerName;
		if (playerName.length > 128)
			playerName = playerName.substring(0, 128);
		else playerName += '\0';

		dvr.writeString(playerName);
	}
}
