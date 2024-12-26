import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';

export type ShopItemSubstitutionSetModel = ExtendedPacketModel & {
	originalItemId: number,
	substitutionItemId: number,
};

export default class ShopItemSubstitutionSet extends ExtendedPacket {
	static create(payload: Partial<ShopItemSubstitutionSetModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ShopItemSubstitutionSetModel) {
		super.reader(dvr, payload);

		payload.originalItemId = dvr.readUint32();
		payload.substitutionItemId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: ShopItemSubstitutionSetModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.originalItemId);
		dvr.writeUint32(payload.substitutionItemId);
	}
}
