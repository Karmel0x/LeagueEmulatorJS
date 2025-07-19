import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type SetCooldownModel = BasePacketModel & {
	slot: number,
	playVOWhenCooldownReady: boolean,
	isSummonerSpell: boolean,
	cooldown: number,
	maxCooldownForDisplay: number,
};

export default class SetCooldown extends BasePacket {
	static create(payload: Partial<SetCooldownModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		playVOWhenCooldownReady: 1,
		isSummonerSpell: 2,
	};

	static reader(dvr: RelativeDataView, payload: SetCooldownModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.playVOWhenCooldownReady = bitfield1.playVOWhenCooldownReady;
		payload.isSummonerSpell = bitfield1.isSummonerSpell;

		payload.cooldown = dvr.readFloat();
		payload.maxCooldownForDisplay = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SetCooldownModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);

		dvr.writeBitfield(this.bitfield1, {
			playVOWhenCooldownReady: payload.playVOWhenCooldownReady,
			isSummonerSpell: payload.isSummonerSpell,
		});

		dvr.writeFloat(payload.cooldown);
		dvr.writeFloat(payload.maxCooldownForDisplay);
	}
}
