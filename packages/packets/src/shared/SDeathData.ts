import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../types/player';

export enum DamageInfoType {
	damage = 0,
	heal = 1,
	buff = 2,
	unknown = 3,
};

export enum DieType {
	minion = 0,
	neutral = 1,
};

export enum DamageType {
	physical = 0,
	magic = 1,
	true = 2,
	mixed = 3,
};

export enum DamageSource {
	raw = 0,
	internalRaw = 1,
	periodic = 2,
	proc = 3,
	reactive = 4,
	onDeath = 5,
	spell = 6,
	attack = 7,
	default = 8,
	spellAoe = 9,
	spellPersist = 10,
	pet = 11,
};

export type SDeathDataModel = {
	becomeZombie: boolean,
	dieType: DieType,
	killerNetId: NetId,
	damageType: DamageType,
	damageSource: DamageSource,
	deathDuration: number,
};

export default class SDeathData extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SDeathDataModel;
	}

	static bitfield1 = {
		becomeZombie: 1,
	};

	static reader(dvr: RelativeDataView, payload: SDeathDataModel) {
		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.becomeZombie = bitfield1.becomeZombie;

		payload.dieType = dvr.readUint32();
		payload.killerNetId = dvr.readUint32();
		payload.damageType = dvr.readUint8();
		payload.damageSource = dvr.readUint8();
		payload.deathDuration = dvr.readFloat();

	}

	static writer(dvr: RelativeDataView, payload: SDeathDataModel) {
		dvr.writeBitfield(this.bitfield1, {
			becomeZombie: payload.becomeZombie,
		});

		dvr.writeUint32(payload.dieType);
		dvr.writeUint32(payload.killerNetId);
		dvr.writeUint8(payload.damageType);
		dvr.writeUint8(payload.damageSource);
		dvr.writeFloat(payload.deathDuration);
	}
}
