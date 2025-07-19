import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { ClientId, NetId } from '../../types/player';

export enum DeathState {
	alive = 0,
	zombie = 1,
	dead = 2,
};

export type CreateHeroModel = BasePacketModel & {
	objectNetId: NetId,
	clientId: ClientId,
	netNodeId: number,
	skillLevel: number,
	teamIsOrder: boolean,
	isBot: boolean,
	botRank: number,
	spawnPosIndex: number,
	skinId: number,
	name: string,
	skinName: string,
	deathDurationRemaining: number,
	timeSinceDeath: number,
	createHeroDeath: DeathState,
	unknown1: boolean,
	unknown2: boolean,
};

export default class CreateHero extends BasePacket {
	static create(payload: Partial<CreateHeroModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		teamIsOrder: 1,
		isBot: 2,
	};

	static bitfield2 = {
		unknown1: 1,
		unknown2: 2,
	};

	static reader(dvr: RelativeDataView, payload: CreateHeroModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.clientId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.skillLevel = dvr.readUint8();

		const bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.teamIsOrder = bitfield1.teamIsOrder
		payload.isBot = bitfield1.isBot

		payload.botRank = dvr.readUint8();
		payload.spawnPosIndex = dvr.readUint8();
		payload.skinId = dvr.readInt32();
		payload.name = dvr.readCharArray(128);
		payload.skinName = dvr.readCharArray(40);
		payload.deathDurationRemaining = dvr.readFloat();
		payload.timeSinceDeath = dvr.readFloat();
		payload.createHeroDeath = dvr.readUint32();

		const bitfield2 = dvr.readBitfield(this.bitfield2);
		payload.unknown1 = bitfield2.unknown1;
		payload.unknown2 = bitfield2.unknown2;
	}

	static writer(dvr: RelativeDataView, payload: CreateHeroModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeInt32(payload.clientId);
		dvr.writeUint8(payload.netNodeId);
		dvr.writeUint8(payload.skillLevel);

		dvr.writeBitfield(this.bitfield1, {
			teamIsOrder: payload.teamIsOrder,
			isBot: payload.isBot,
		});

		dvr.writeUint8(payload.botRank);
		dvr.writeUint8(payload.spawnPosIndex);
		dvr.writeInt32(payload.skinId);
		dvr.writeCharArray(payload.name, 128);
		dvr.writeCharArray(payload.skinName, 40);
		dvr.writeFloat(payload.deathDurationRemaining);
		dvr.writeFloat(payload.timeSinceDeath);
		dvr.writeUint32(payload.createHeroDeath);

		dvr.writeBitfield(this.bitfield2, {
			unknown1: payload.unknown1,
			unknown2: payload.unknown2,
		});
	}
}
