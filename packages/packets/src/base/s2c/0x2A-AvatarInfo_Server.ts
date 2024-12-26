import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type TalentModel = {
	hash: number,
	level: number,
};

export type AvatarInfo_ServerModel = BasePacketModel & {
	itemIds: number[],
	summonerIds: number[],
	summonerIds2: number[],
	talents: TalentModel[],
	level: number,
	wardSkin: number,
};

export default class AvatarInfo_Server extends BasePacket {
	static create(payload: Partial<AvatarInfo_ServerModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AvatarInfo_ServerModel) {
		super.reader(dvr, payload);

		payload.itemIds = dvr.readArray(() => dvr.readUint32(), 30);
		payload.summonerIds = dvr.readArray(() => dvr.readUint32(), 2);
		payload.summonerIds2 = dvr.readArray(() => dvr.readUint32(), 2);
		payload.talents = dvr.readArray(() => ({
			hash: dvr.readUint32(),
			level: dvr.readUint8(),
		}), 80);
		payload.level = dvr.readUint8();
		payload.wardSkin = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: AvatarInfo_ServerModel) {
		super.writer(dvr, payload);

		dvr.writeArray(payload.itemIds, v => dvr.writeUint32(v), 30);
		dvr.writeArray(payload.summonerIds, v => dvr.writeUint32(v), 2);
		dvr.writeArray(payload.summonerIds2, v => dvr.writeUint32(v), 2);
		dvr.writeArray(payload.talents, talent => {
			talent = talent || {};
			dvr.writeUint32(talent.hash);
			dvr.writeUint8(talent.level);
		}, 80);
		dvr.writeUint8(payload.level);
		dvr.writeUint8(payload.wardSkin);
	}
}