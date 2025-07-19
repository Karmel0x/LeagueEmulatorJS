import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum ttype_e {
	//invalid = 0xFFFFFFFF,
	self = 0x0,
	target = 0x1,
	area = 0x2,
	cone = 0x3,
	selfAOE = 0x4,
	targetOrLocation = 0x5,
	location = 0x6,
	direction = 0x7,
	/** rumble r */
	dragDirection = 0x8,
	//lineTargetToCaster = 0x9,
	/** orianna w,r */
	offsetAOE = 0x9,
	/** ? */
	offsetLocation = 0xA,
};

export enum ChangeSlotSpellDataType {
	// -1 ?
	targetingType = 1,
	spellName = 2,
	range = 3,
	maxGrowthRange = 4,
	rangeDisplay = 5,
	iconIndex = 6,
	offsetTarget = 7,
};

export type ChangeSlotSpellDataModel = BasePacketModel & {
	slot: number,
	isSummonerSpell: boolean,
} & ({
	changeSlotSpellDataType: ChangeSlotSpellDataType.targetingType,
	targetingType: number,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.spellName,
	spellName: string,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.range,
	castRange: number,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.maxGrowthRange,
	overrideMaxCastRange: number,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.rangeDisplay,
	overrideCastRangeDisplay: number,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.iconIndex,
	iconIndex: number,
} | {
	changeSlotSpellDataType: ChangeSlotSpellDataType.offsetTarget,
	targetNetIds: NetId[],
});

export default class ChangeSlotSpellData extends BasePacket {
	static create(payload: Partial<ChangeSlotSpellDataModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isSummonerSpell: 1,
	};

	static reader(dvr: RelativeDataView, payload: ChangeSlotSpellDataModel) {
		super.reader(dvr, payload);

		payload.slot = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isSummonerSpell = bitfield1.isSummonerSpell;

		payload.changeSlotSpellDataType = dvr.readUint32();//readUint8
		switch (payload.changeSlotSpellDataType) {
			case ChangeSlotSpellDataType.targetingType:
				payload.targetingType = dvr.readUint8();
				break;
			case ChangeSlotSpellDataType.spellName:
				payload.spellName = dvr.readStringNullTerminated(128);
				break;
			case ChangeSlotSpellDataType.range:
				payload.castRange = dvr.readFloat();
				break;
			case ChangeSlotSpellDataType.maxGrowthRange:
				payload.overrideMaxCastRange = dvr.readFloat();
				break;
			case ChangeSlotSpellDataType.rangeDisplay:
				payload.overrideCastRangeDisplay = dvr.readFloat();
				break;
			case ChangeSlotSpellDataType.iconIndex:
				payload.iconIndex = dvr.readUint8();
				break;
			case ChangeSlotSpellDataType.offsetTarget:
				let count = dvr.readUint8();
				payload.targetNetIds = dvr.readArray(() => dvr.readUint32(), count);
				break;
		}
	}

	static writer(dvr: RelativeDataView, payload: ChangeSlotSpellDataModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.slot);

		dvr.writeBitfield(this.bitfield1, {
			isSummonerSpell: payload.isSummonerSpell,
		});

		dvr.writeUint32(payload.changeSlotSpellDataType);
		switch (payload.changeSlotSpellDataType) {
			case ChangeSlotSpellDataType.targetingType:
				dvr.writeUint8(payload.targetingType);
				break;
			case ChangeSlotSpellDataType.spellName:
				dvr.writeStringNullTerminated(payload.spellName, 128);
				break;
			case ChangeSlotSpellDataType.range:
				dvr.writeFloat(payload.castRange);
				break;
			case ChangeSlotSpellDataType.maxGrowthRange:
				dvr.writeFloat(payload.overrideMaxCastRange);
				break;
			case ChangeSlotSpellDataType.rangeDisplay:
				dvr.writeFloat(payload.overrideCastRangeDisplay);
				break;
			case ChangeSlotSpellDataType.iconIndex:
				dvr.writeUint8(payload.iconIndex);
				break;
			case ChangeSlotSpellDataType.offsetTarget:
				payload.targetNetIds = payload.targetNetIds || [];
				dvr.writeUint8(payload.targetNetIds.length);
				payload.targetNetIds.forEach(targetNetId => {
					dvr.writeUint32(targetNetId);
				});
				break;
		}
	}
}
