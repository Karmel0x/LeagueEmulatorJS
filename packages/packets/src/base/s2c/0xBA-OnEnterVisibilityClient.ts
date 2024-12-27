import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import CMovementDataNormal, { CMovementDataNormalModel } from '../../shared/CMovementDataNormal';
import CMovementDataWithSpeed, { CMovementDataWithSpeedModel } from '../../shared/CMovementDataWithSpeed';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export type PacketDataModel = {
	data: number[],
};

export type ItemDataModel = {
	slot: number,
	itemsInSlot: number,
	spellCharges: number,
	itemId: number,
};

export type ShieldValuesModel = {
	magical: number,
	physical: number,
	magicalAndPhysical: number,
};

export type CharacterStackDataModel = {
	skinName: string,
	skinId: number,
	overrideSpells: boolean,
	modelOnly: boolean,
	replaceCharacterPackage: boolean,
	id: number,
};

export type BuffModel = {
	slot: number,
	count: number,
};

export enum MovementDataType {
	none = 0,
	withSpeed = 1,
	normal = 2,
	stop = 3,
};

export type MovementData = {
	type: MovementDataType,
	syncId: number,
} & (
		{ type: MovementDataType.none } |
		{ type: MovementDataType.withSpeed } & CMovementDataWithSpeedModel |
		{ type: MovementDataType.normal } & CMovementDataNormalModel |
		{ type: MovementDataType.stop, position: SVector2Model, forward: SVector2Model }
	);

export type OnEnterVisibilityClientModel = BasePacketModel & {
	packets: PacketDataModel[],
	itemData: ItemDataModel[],
} & ({
	isTurret: true,
} | {
	isTurret: false,
	shieldValues?: ShieldValuesModel,
	characterStackData?: Partial<CharacterStackDataModel>[],
	lookAtNetId: NetId,
	lookAtType: number,
	lookAtPosition: SVector3Model,
	buff?: BuffModel[],
	unknownIsHero: boolean,
	movementData: MovementData,
});

export default class OnEnterVisibilityClient extends BasePacket {
	static create(payload: Partial<OnEnterVisibilityClientModel>) {
		return super.create(payload);
	}

	static characterStackDataBitfield1 = {
		overrideSpells: 1 << 0,
		modelOnly: 1 << 1,
		replaceCharacterPackage: 1 << 2,
	}

	static reader(dvr: RelativeDataView, payload: OnEnterVisibilityClientModel) {
		super.reader(dvr, payload);

		let packetSize = dvr.readUint16();
		payload.packets = dvr.readArray(() => ({
			data: dvr.readArray(() => dvr.readUint8(), packetSize),
		}), packetSize);

		let itemDataSize = dvr.readUint8();
		payload.itemData = dvr.readArray(() => ({
			slot: dvr.readUint8(),
			itemsInSlot: dvr.readUint8(),
			spellCharges: dvr.readUint8(),
			itemId: dvr.readUint32(),
		}), itemDataSize);

		payload.isTurret = dvr.offset >= dvr.length;
		if (payload.isTurret)
			return;

		let hasShieldValues = dvr.readBool();
		if (hasShieldValues) {
			payload.shieldValues = {
				magical: dvr.readFloat(),
				physical: dvr.readFloat(),
				magicalAndPhysical: dvr.readFloat(),
			};
		}

		let characterStackDataSize = dvr.readInt32();
		payload.characterStackData = dvr.readArray(() => ({
			skinName: dvr.readString(),
			skinId: dvr.readUint32(),
			...dvr.readBitfield(this.characterStackDataBitfield1),
			id: dvr.readUint32(),
		}), characterStackDataSize);

		payload.lookAtNetId = dvr.readUint32();
		payload.lookAtType = dvr.readUint8();
		payload.lookAtPosition = SVector3.read(dvr);

		let buffSize = dvr.readInt32();
		payload.buff = dvr.readArray(() => ({
			slot: dvr.readUint8(),
			count: dvr.readInt32(),
		}), buffSize);

		payload.unknownIsHero = dvr.readBool();

		if (dvr.bytesLeft < 5)
			return;

		payload.movementData = {} as typeof payload.movementData;
		payload.movementData.type = dvr.readUint8();
		payload.movementData.syncId = dvr.readInt32();

		if (payload.movementData.type === MovementDataType.withSpeed) {
			CMovementDataWithSpeed.reader(dvr, payload.movementData);
		}
		else if (payload.movementData.type === MovementDataType.normal) {
			CMovementDataNormal.reader(dvr, payload.movementData);
		}
		else if (payload.movementData.type === MovementDataType.stop) {
			payload.movementData.position = SVector2.read(dvr);
			payload.movementData.forward = SVector2.read(dvr);
		}
	}

	static writer(dvr: RelativeDataView, payload: OnEnterVisibilityClientModel) {
		super.writer(dvr, payload);

		let packets = payload.packets || [];
		dvr.writeUint16(packets.length);
		packets.forEach(packet => {
			dvr.writeArray(packet.data, dvr.writeUint8);
		});

		let itemData = payload.itemData || [];
		dvr.writeUint8(itemData.length);
		itemData.forEach(item => {
			dvr.writeUint8(item.slot);
			dvr.writeUint8(item.itemsInSlot);
			dvr.writeUint8(item.spellCharges);
			dvr.writeUint32(item.itemId);
		});

		if (payload.isTurret)
			return;

		let hasShieldValues = !!payload.shieldValues;
		dvr.writeBool(hasShieldValues);
		if (hasShieldValues) {
			dvr.writeFloat(payload.shieldValues!.magical);
			dvr.writeFloat(payload.shieldValues!.physical);
			dvr.writeFloat(payload.shieldValues!.magicalAndPhysical);
		}

		let characterStackData = payload.characterStackData || [];
		dvr.writeInt32(characterStackData.length);
		characterStackData.forEach(character => {
			dvr.writeString(character.skinName);
			dvr.writeUint32(character.skinId);
			dvr.writeBitfield(this.characterStackDataBitfield1, character);
			dvr.writeUint32(character.id);
		});

		dvr.writeUint32(payload.lookAtNetId);
		dvr.writeUint8(payload.lookAtType);
		SVector3.writer(dvr, payload.lookAtPosition);

		let buff = payload.buff || [];
		dvr.writeInt32(buff.length);
		buff.forEach(buff => {
			dvr.writeUint8(buff.slot);
			dvr.writeInt32(buff.count);
		});

		dvr.writeBool(payload.unknownIsHero);

		if (!payload.movementData)
			return;

		dvr.writeUint8(payload.movementData.type);
		dvr.writeInt32(payload.movementData.syncId);

		if (payload.movementData.type === MovementDataType.withSpeed) {
			CMovementDataWithSpeed.writer(dvr, payload.movementData);
		}
		else if (payload.movementData.type === MovementDataType.normal) {
			CMovementDataNormal.writer(dvr, payload.movementData);
		}
		else if (payload.movementData.type === MovementDataType.stop) {
			SVector2.writer(dvr, payload.movementData.position);
			SVector2.writer(dvr, payload.movementData.forward);
		}
	}
}
