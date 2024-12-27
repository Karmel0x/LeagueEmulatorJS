import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import { OnEvent, OnEventArguments, OnEventParam } from '../types/on-event';
import type { NetId } from '../types/player';

export type SEventModelBase = {
	eventId: OnEvent,
	onEventParam: OnEventParam,
	otherNetId: NetId,
};

export type SEventModelDie = SEventModelBase & {
	onEventParam: OnEventParam.die,
	goldGiven: number,
	assists: NetId[],
};


export type SEventModelChampionKillPre = SEventModelBase & {
	onEventParam: OnEventParam.championKillPre,
	unknown1: boolean,
};

export type SEventModelDamage = SEventModelBase & {
	onEventParam: OnEventParam.damage,
	scriptNameHash: number,
	eventSource: number,
	unknown1: number,
	sourceObjectNetId: NetId,
	physicalDamage: number,
	magicalDamage: number,
	trueDamage: number,
	parentScriptNameHash: number,
	parentCasterNetId: NetId,
	bitfield: number,
};

export type SEventModelGoldSpent = SEventModelBase & {
	onEventParam: OnEventParam.goldSpent,
	amount: number,
};

export type SEventModelGoldEarned = SEventModelBase & {
	onEventParam: OnEventParam.goldEarned,
	amount: number,
	unknown1: number,
};

export type SEventModelItemConsumedPurchased = SEventModelBase & {
	onEventParam: OnEventParam.itemConsumedPurchased,
	itemId: number,
};

export type SEventModelDamageCriticalStrike = SEventModelBase & {
	onEventParam: OnEventParam.damageCriticalStrike,
	damage: number,
};

export type SEventModelMinionKill = Omit<SEventModelDie, 'onEventParam'> & {
	onEventParam: OnEventParam.minionKill,
	minionSkinNameHash: number,
	minionSkinId: number,
	minionTeamId: number,
};

export type SEventModelHeal = SEventModelBase & {
	onEventParam: OnEventParam.heal,
	scriptNameHash: number,
	eventSource: number,
	unknown1: number,
	sourceObjectNetId: NetId,
	healAmmount: number,
	parentScriptNameHash: number,
	parentCasterNetId: NetId,
	bitfield: number,
};

export type SEventModelBuff = SEventModelBase & {
	onEventParam: OnEventParam.buff,
	scriptNameHash: number,
	eventSource: number,
	unknown1: number,
	sourceObjectNetId: NetId,
	parentScriptNameHash: number,
	parentCasterNetId: NetId,
	bitfield: number,
};

export type SEventModelCC = Omit<SEventModelBuff, 'onEventParam'> & {
	onEventParam: OnEventParam.cc,
	buffType: number,
	finalDuration: number,
};

export type SEventModelKillingSpree = SEventModelBase & {
	onEventParam: OnEventParam.killingSpree,
	amount: number,
};

export type SEventModelAssist = SEventModelBase & {
	onEventParam: OnEventParam.assist,
	atTime: number,
	physicalDamage: number,
	magicalDamage: number,
	trueDamage: number,
	percentageOfAssist: number,
	orginalGoldReward: number,
	killerNetId: NetId,
};

export type SEventModelItemSoldOrRemoved = SEventModelBase & {
	onEventParam: OnEventParam.itemSoldOrRemoved,
	itemId: number,
};

export type SEventModelItemUndo = SEventModelBase & {
	onEventParam: OnEventParam.itemUndo,
	itemId: number,
	upgradedFromItems: number[],
	goldGain: number,
};

export type SEventModelItemCallout = SEventModelBase & {
	onEventParam: OnEventParam.itemCallout,
	itemId: number,
	itemCount: number,
	unknown1: number[],
	team: number,
};

export type SEventModelItemChange = SEventModelBase & {
	onEventParam: OnEventParam.itemChange,
	itemId: number,
};

export type SEventModelUndoEnabledChange = SEventModelBase & {
	onEventParam: OnEventParam.undoEnabledChange,
	undoStackLength: number,
};

export type SEventModelShopItemSubstitutionChange = SEventModelBase & {
	onEventParam: OnEventParam.shopItemSubstitutionChange,
	enableSubstitution: number,
	originalItemId: number,
	substitutedItemId: number,
};

export type SEventModelGlobalMessageGeneric = SEventModelBase & {
	onEventParam: OnEventParam.globalMessageGeneric,
	mapNumber: number,
};

export type SEventModelAlert = SEventModelBase & {
	onEventParam: OnEventParam.alert,
	unknown1: number[],
	unknown2: number[],
};

export type SEventModelCapturePoint = SEventModelBase & {
	onEventParam: OnEventParam.capturePoint,
	capturePoint: number,
};

export type SEventModel = SEventModelDie | SEventModelChampionKillPre | SEventModelDamage | SEventModelGoldSpent
	| SEventModelGoldEarned | SEventModelItemConsumedPurchased | SEventModelDamageCriticalStrike
	| SEventModelMinionKill | SEventModelHeal | SEventModelBuff | SEventModelCC | SEventModelKillingSpree
	| SEventModelAssist | SEventModelItemSoldOrRemoved | SEventModelItemUndo | SEventModelItemCallout
	| SEventModelItemChange | SEventModelUndoEnabledChange | SEventModelShopItemSubstitutionChange
	| SEventModelGlobalMessageGeneric | SEventModelAlert | SEventModelCapturePoint;

export default class SEvent extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SEventModel;
	}

	static championKillPreBitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: SEventModel) {
		payload.eventId = dvr.readUint8();
		payload.otherNetId = dvr.readUint32();

		let payloadEvent = payload.eventId;
		payload.onEventParam = payload.onEventParam ?? OnEventArguments[payloadEvent];

		if (payload.onEventParam) {
			if (payload.onEventParam === OnEventParam.die || payload.onEventParam === OnEventParam.minionKill) {
				payload.goldGiven = dvr.readFloat32();
				let assistCount = dvr.readInt32();
				payload.assists = dvr.readArray(() => dvr.readUint32(), assistCount);

				if (payload.onEventParam === OnEventParam.minionKill) {
					payload.minionSkinNameHash = dvr.readUint32();
					payload.minionSkinId = dvr.readInt32();
					payload.minionTeamId = dvr.readUint32();
				}
			}
			else if (payload.onEventParam === OnEventParam.championKillPre) {
				let bitfield1 = dvr.readBitfield(this.championKillPreBitfield1);
				payload.unknown1 = bitfield1.unknown1;
			}
			else if (payload.onEventParam === OnEventParam.damage) {
				payload.scriptNameHash = dvr.readUint32();
				payload.eventSource = dvr.readUint8();
				payload.unknown1 = dvr.readUint8();
				payload.sourceObjectNetId = dvr.readUint32();
				payload.physicalDamage = dvr.readFloat32();
				payload.magicalDamage = dvr.readFloat32();
				payload.trueDamage = dvr.readFloat32();
				payload.parentScriptNameHash = dvr.readUint32();
				payload.parentCasterNetId = dvr.readUint32();
				payload.bitfield = dvr.readUint16();
			}
			else if (payload.onEventParam === OnEventParam.goldSpent) {
				payload.amount = dvr.readFloat32();
			}
			else if (payload.onEventParam === OnEventParam.goldEarned) {
				payload.amount = dvr.readFloat32();
				payload.unknown1 = dvr.readUint64();
			}
			else if (payload.onEventParam === OnEventParam.itemConsumedPurchased) {
				payload.itemId = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.damageCriticalStrike) {
				payload.damage = dvr.readFloat32();
			}
			else if (payload.onEventParam === OnEventParam.heal) {
				payload.scriptNameHash = dvr.readUint32();
				payload.eventSource = dvr.readUint8();
				payload.unknown1 = dvr.readUint8();
				payload.sourceObjectNetId = dvr.readUint32();
				payload.healAmmount = dvr.readFloat32();
				payload.parentScriptNameHash = dvr.readUint32();
				payload.parentCasterNetId = dvr.readUint32();
				payload.bitfield = dvr.readUint16();
			}
			else if (payload.onEventParam === OnEventParam.buff || payload.onEventParam === OnEventParam.cc) {
				payload.scriptNameHash = dvr.readUint32();
				payload.eventSource = dvr.readUint8();
				payload.unknown1 = dvr.readUint8();
				payload.sourceObjectNetId = dvr.readUint32();
				payload.parentScriptNameHash = dvr.readUint32();
				payload.parentCasterNetId = dvr.readUint32();
				payload.bitfield = dvr.readUint16();

				if (payload.onEventParam === OnEventParam.cc) {
					payload.buffType = dvr.readInt32();
					payload.finalDuration = dvr.readFloat32();
				}
			}
			else if (payload.onEventParam === OnEventParam.killingSpree) {
				payload.amount = dvr.readInt32();
			}
			else if (payload.onEventParam === OnEventParam.assist) {
				payload.atTime = dvr.readFloat32();
				payload.physicalDamage = dvr.readFloat32();
				payload.magicalDamage = dvr.readFloat32();
				payload.trueDamage = dvr.readFloat32();
				payload.percentageOfAssist = dvr.readFloat32();
				payload.orginalGoldReward = dvr.readFloat32();
				payload.killerNetId = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.itemSoldOrRemoved) {
				payload.itemId = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.itemUndo) {
				payload.itemId = dvr.readUint32();
				payload.upgradedFromItems = dvr.readArray(() => dvr.readUint32(), 7);
				payload.goldGain = dvr.readFloat32();
			}
			else if (payload.onEventParam === OnEventParam.itemCallout) {
				payload.itemId = dvr.readUint32();
				payload.itemCount = dvr.readUint32();
				payload.unknown1 = dvr.readArray(() => dvr.readUint8(), 24);
				payload.team = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.itemChange) {
				payload.itemId = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.undoEnabledChange) {
				payload.undoStackLength = dvr.readInt32();
			}
			else if (payload.onEventParam === OnEventParam.shopItemSubstitutionChange) {
				payload.enableSubstitution = dvr.readUint8();
				payload.originalItemId = dvr.readUint32();
				payload.substitutedItemId = dvr.readUint32();
			}
			else if (payload.onEventParam === OnEventParam.globalMessageGeneric) {
				payload.mapNumber = dvr.readInt32();
			}
			else if (payload.onEventParam === OnEventParam.alert) {
				payload.unknown1 = dvr.readArray(() => dvr.readUint8(), 4);
				payload.unknown2 = dvr.readArray(() => dvr.readUint8(), 4);
			}
			else if (payload.onEventParam === OnEventParam.capturePoint) {
				payload.capturePoint = dvr.readUint32();
			}
		}
	}

	static writer(dvr: RelativeDataView, payload: SEventModel) {
		dvr.writeUint8(payload.eventId);
		dvr.writeUint32(payload.otherNetId);

		if (payload.onEventParam) {
			if (payload.onEventParam === OnEventParam.die || payload.onEventParam === OnEventParam.minionKill) {
				dvr.writeFloat32(payload.goldGiven);
				dvr.writeInt32(payload.assists.length);
				dvr.writeArray(payload.assists, (assist) => dvr.writeUint32(assist));

				if (payload.onEventParam === OnEventParam.minionKill) {
					dvr.writeUint32(payload.minionSkinNameHash);
					dvr.writeInt32(payload.minionSkinId);
					dvr.writeUint32(payload.minionTeamId);
				}
			}
			else if (payload.onEventParam === OnEventParam.championKillPre) {
				dvr.writeBitfield(this.championKillPreBitfield1, {
					unknown1: payload.unknown1,
				});
			}
			else if (payload.onEventParam === OnEventParam.damage) {
				dvr.writeUint32(payload.scriptNameHash);
				dvr.writeUint8(payload.eventSource);
				dvr.writeUint8(payload.unknown1);
				dvr.writeUint32(payload.sourceObjectNetId);
				dvr.writeFloat32(payload.physicalDamage);
				dvr.writeFloat32(payload.magicalDamage);
				dvr.writeFloat32(payload.trueDamage);
				dvr.writeUint32(payload.parentScriptNameHash);
				dvr.writeUint32(payload.parentCasterNetId);
				dvr.writeUint16(payload.bitfield);
			}
			else if (payload.onEventParam === OnEventParam.goldSpent) {
				dvr.writeFloat32(payload.amount);
			}
			else if (payload.onEventParam === OnEventParam.goldEarned) {
				dvr.writeFloat32(payload.amount);
				dvr.writeUint64(payload.unknown1);
			}
			else if (payload.onEventParam === OnEventParam.itemConsumedPurchased) {
				dvr.writeUint32(payload.itemId);
			}
			else if (payload.onEventParam === OnEventParam.damageCriticalStrike) {
				dvr.writeFloat32(payload.damage);
			}
			else if (payload.onEventParam === OnEventParam.heal) {
				dvr.writeUint32(payload.scriptNameHash);
				dvr.writeUint8(payload.eventSource);
				dvr.writeUint8(payload.unknown1);
				dvr.writeUint32(payload.sourceObjectNetId);
				dvr.writeFloat32(payload.healAmmount);
				dvr.writeUint32(payload.parentScriptNameHash);
				dvr.writeUint32(payload.parentCasterNetId);
				dvr.writeUint16(payload.bitfield);
			}
			else if (payload.onEventParam === OnEventParam.buff || payload.onEventParam === OnEventParam.cc) {
				dvr.writeUint32(payload.scriptNameHash);
				dvr.writeUint8(payload.eventSource);
				dvr.writeUint8(payload.unknown1);
				dvr.writeUint32(payload.sourceObjectNetId);
				dvr.writeUint32(payload.parentScriptNameHash);
				dvr.writeUint32(payload.parentCasterNetId);
				dvr.writeUint16(payload.bitfield);

				if (payload.onEventParam === OnEventParam.cc) {
					dvr.writeInt32(payload.buffType);
					dvr.writeFloat32(payload.finalDuration);
				}
			}
			else if (payload.onEventParam === OnEventParam.killingSpree) {
				dvr.writeInt32(payload.amount);
			}
			else if (payload.onEventParam === OnEventParam.assist) {
				dvr.writeFloat32(payload.atTime);
				dvr.writeFloat32(payload.physicalDamage);
				dvr.writeFloat32(payload.magicalDamage);
				dvr.writeFloat32(payload.trueDamage);
				dvr.writeFloat32(payload.percentageOfAssist);
				dvr.writeFloat32(payload.orginalGoldReward);
				dvr.writeUint32(payload.killerNetId);
			}
			else if (payload.onEventParam === OnEventParam.itemSoldOrRemoved) {
				dvr.writeUint32(payload.itemId);
			}
			else if (payload.onEventParam === OnEventParam.itemUndo) {
				dvr.writeUint32(payload.itemId);
				dvr.writeArray(payload.upgradedFromItems, (upgradedFromItem) => dvr.writeUint32(upgradedFromItem));
				dvr.writeFloat32(payload.goldGain);
			}
			else if (payload.onEventParam === OnEventParam.itemCallout) {
				dvr.writeUint32(payload.itemId);
				dvr.writeUint32(payload.itemCount);
				dvr.writeArray(payload.unknown1, (unknown1) => dvr.writeUint8(unknown1));
				dvr.writeUint32(payload.team);
			}
			else if (payload.onEventParam === OnEventParam.itemChange) {
				dvr.writeUint32(payload.itemId);
			}
			else if (payload.onEventParam === OnEventParam.undoEnabledChange) {
				dvr.writeInt32(payload.undoStackLength);
			}
			else if (payload.onEventParam === OnEventParam.shopItemSubstitutionChange) {
				dvr.writeUint8(payload.enableSubstitution);
				dvr.writeUint32(payload.originalItemId);
				dvr.writeUint32(payload.substitutedItemId);
			}
			else if (payload.onEventParam === OnEventParam.globalMessageGeneric) {
				dvr.writeInt32(payload.mapNumber);
			}
			else if (payload.onEventParam === OnEventParam.alert) {
				dvr.writeArray(payload.unknown1, (unknown1) => dvr.writeUint8(unknown1));
				dvr.writeArray(payload.unknown2, (unknown2) => dvr.writeUint8(unknown2));
			}
			else if (payload.onEventParam === OnEventParam.capturePoint) {
				dvr.writeUint32(payload.capturePoint);
			}
		}
	}
}
