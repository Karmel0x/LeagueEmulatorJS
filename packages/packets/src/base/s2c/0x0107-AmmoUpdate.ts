import ExtendedPacket, { type ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type AmmoUpdateModel = ExtendedPacketModel & {
	isSummonerSpell: boolean,
	slot: number,
	currentAmmo: number,
	maxAmmo: number,
	ammoRecharge: number,
	ammoRechargeTotalTime: number,
};

export default class AmmoUpdate extends ExtendedPacket {
	static create(payload: Partial<AmmoUpdateModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AmmoUpdateModel) {
		super.reader(dvr, payload);

		payload.isSummonerSpell = dvr.readBool();
		payload.slot = dvr.readInt32();
		payload.currentAmmo = dvr.readInt32();
		payload.maxAmmo = dvr.readInt32();
		payload.ammoRecharge = dvr.readFloat();
		payload.ammoRechargeTotalTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: AmmoUpdateModel) {
		super.writer(dvr, payload);

		dvr.writeBool(payload.isSummonerSpell);
		dvr.writeInt32(payload.slot);
		dvr.writeInt32(payload.currentAmmo);
		dvr.writeInt32(payload.maxAmmo);
		dvr.writeFloat(payload.ammoRecharge);
		dvr.writeFloat(payload.ammoRechargeTotalTime);
	}
}
