import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type SpellChargeUpdateReqModel = BasePacketModel & {
	isSummonerSpellBook: boolean,
	forceStop: boolean,
	slot: number,
	position: SVector3Model,
};

export default class SpellChargeUpdateReq extends BasePacket {
	static create(payload: Partial<SpellChargeUpdateReqModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isSummonerSpellBook: 1,
		forceStop: 2,
	};

	static reader(dvr: RelativeDataView, payload: SpellChargeUpdateReqModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isSummonerSpellBook = bitfield1.isSummonerSpellBook;
		payload.forceStop = bitfield1.forceStop;

		payload.slot = dvr.readUint8();
		payload.position = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: SpellChargeUpdateReqModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			isSummonerSpellBook: payload.isSummonerSpellBook,
			forceStop: payload.forceStop,
		});

		dvr.writeUint8(payload.slot);
		SVector3.writer(dvr, payload.position);
	}
}
