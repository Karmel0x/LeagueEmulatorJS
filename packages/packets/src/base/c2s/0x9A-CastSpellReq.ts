import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { type SVector2Model } from '../../shared/SVector2';
import type { NetId } from '../../types/player';

export type CastSpellReqModel = BasePacketModel & {
	isSummonerSpellBook: boolean,
	isHudClickCast: boolean,
	slot: number,
	position: SVector2Model,
	endPosition: SVector2Model,
	targetNetId: NetId,
};

export default class CastSpellReq extends BasePacket {
	static create(payload: Partial<CastSpellReqModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isSummonerSpellBook: 1,
		isHudClickCast: 2,
	};

	static reader(dvr: RelativeDataView, payload: CastSpellReqModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isSummonerSpellBook = bitfield1.isSummonerSpellBook;
		payload.isHudClickCast = bitfield1.isHudClickCast;

		payload.slot = dvr.readUint8();
		payload.position = SVector2.read(dvr);
		payload.endPosition = SVector2.read(dvr);
		payload.targetNetId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: CastSpellReqModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			isSummonerSpellBook: payload.isSummonerSpellBook,
			isHudClickCast: payload.isHudClickCast,
		});

		dvr.writeUint8(payload.slot);
		SVector2.writer(dvr, payload.position);
		SVector2.writer(dvr, payload.endPosition);
		dvr.writeUint32(payload.targetNetId);
	}
}
