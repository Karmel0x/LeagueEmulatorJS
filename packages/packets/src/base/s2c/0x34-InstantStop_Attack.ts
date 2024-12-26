import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type InstantStop_AttackModel = BasePacketModel & {
	missileNetId: NetId,
	keepAnimating: boolean,
	destroyMissile: boolean,
	overrideVisibility: boolean,
	isSummonerSpell: boolean,
	forceDoClient: boolean,
};

export default class InstantStop_Attack extends BasePacket {
	static create(payload: Partial<InstantStop_AttackModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		keepAnimating: 1 << 0,
		destroyMissile: 1 << 1,
		overrideVisibility: 1 << 2,
		isSummonerSpell: 1 << 3,
		forceDoClient: 1 << 4,
	};

	static reader(dvr: RelativeDataView, payload: InstantStop_AttackModel) {
		super.reader(dvr, payload);

		payload.missileNetId = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.keepAnimating = bitfield1.keepAnimating;
		payload.destroyMissile = bitfield1.destroyMissile;
		payload.overrideVisibility = bitfield1.overrideVisibility;
		payload.isSummonerSpell = bitfield1.isSummonerSpell;
		payload.forceDoClient = bitfield1.forceDoClient;
	}

	static writer(dvr: RelativeDataView, payload: InstantStop_AttackModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.missileNetId);

		dvr.writeBitfield(this.bitfield1, {
			keepAnimating: payload.keepAnimating,
			destroyMissile: payload.destroyMissile,
			overrideVisibility: payload.overrideVisibility,
			isSummonerSpell: payload.isSummonerSpell,
			forceDoClient: payload.forceDoClient,
		});
	}
}