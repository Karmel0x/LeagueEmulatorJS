import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { TeamId } from '../../types/team';

export enum VOEventType {
	first = 0x0,
	announcer = 0x0,
	conversation = 0x1,
	shop = 0x2,
	command = 0x3,
	death = 0x4,
	importantCallout = 0x5,
	specialSpell = 0x6,
	spellUlt = 0x7,
	itemPurchase = 0x8,
	interactiveEvent = 0x9,
	lastHit = 0xa,
	emote = 0xb,
	firstMove = 0xc,
	orderConfirmation = 0xd,
	spell = 0xe,
}

export enum VOComponentEvent {
	commandAttackCharge = 0x0,
	commandAttackHey = 0x1,
	commandDefendAllyChampion = 0x2,
	commandAttackEnemyChampion = 0x3,
	commandDefendAllyTower = 0x4,
	commandDefendAllyInhibitor = 0x5,
	commandDefendAllyNexus = 0x6,
	commandDefendAllyCapturePoint = 0x7,
	commandAttackEnemyTower = 0x8,
	commandAttackNeutralMonster = 0x9,
	commandAttackWorm = 0xa,
	commandAttackDragon = 0xb,
	commandAttackEnemyInhibitor = 0xc,
	commandAttackEnemyNexus = 0xd,
	commandAttackNeutralCapturePoint = 0xe,
	commandDefendSelf = 0xf,
	commandDangerOpenSpace = 0x10,
	commandBack = 0x11,
	commandDangerEnemyChampion = 0x12,
	commandDangerEnemyTower = 0x13,
	commandDangerEnemyCapturePoint = 0x14,
	commandAttentionSelf = 0x15,
	commandNonposOutofmana = 0x16,
	commandNonposHelp = 0x17,
	commandNonposThanks = 0x18,
	commandNonposNicejob = 0x19,
	commandNonposMia = 0x1a,
	commandNonposNevermind = 0x1b,
	commandNonposSorry = 0x1c,
	commandNonposOnmyway = 0x1d,
	commandNonposYes = 0x1e,
	commandNonposNo = 0x1f,
	announcementKillChampion = 0x20,
	announcementEndSpree = 0x21,
	interactiveRevive = 0x22,
	interactiveIdleInBrush = 0x23,
	interactiveKillEpic = 0x24,
	interactiveAssistAlly = 0x25,
	interactivePlaceWard = 0x26,
	interactiveAssistThanks = 0x27,
	interactiveBluepill = 0x28,
	interactiveSigilAcquired = 0x29,
	interactiveRevealEnemyNashorKill = 0x2a,
	interactiveRevealEnemyDragonKill = 0x2b,
	interactiveRevealEnemyBuffSteal = 0x2c,
	interactiveAcquireGreaterRelic = 0x2d,
	interactiveAcquireHealthRelic = 0x2e,
	interactiveAcquireSpeedBuff = 0x2f,
	interactiveHeal = 0x30,
	summonerPlatform = 0x31,
	interactiveChampionSpecific1 = 0x32,
	interactiveChampionSpecific2 = 0x33,
	interactiveChampionSpecific3 = 0x34,
	interactiveChampionSpecific4 = 0x35,
	interactiveChampionSpecific5 = 0x36,
	interactiveChampionSpecific6 = 0x37,
	interactiveChampionSpecific7 = 0x38,
	interactiveChampionSpecific8 = 0x39,
	interactiveChampionSpecific9 = 0x3a,
	interactiveLevelUp = 0x3b,
	interactiveUltimateReady = 0x3c,
	interactivePurchaseItem = 0x3d,
	interactiveKillMinion = 0x3e,
	orderackAttack = 0x3f,
	orderackUse = 0x40,
	interactiveClearNeutralCamp = 0x41,
	shopMenuOpen = 0x42,
	shopEventFirst = 0x42,
	shopPurchaseItem = 0x43,
	shopClose = 0x44,
	shopBrowsing = 0x45,
	shopAmbient = 0x46,
	shopForgotItems = 0x47,
	shopMenuOpenRich = 0x48,
	shopEventLast = 0x49,
	shopMenuOpenMultiTimes = 0x49,
};

export type CreateMinionCampModel = ExtendedPacketModel & {
	position: SVector3Model,
	minimapIcon: string,
	campIndex: number,
	voComponentRevealEvent: number,
	teamId: TeamId,
	timerType: number,
	expire: number,
};

export default class CreateMinionCamp extends ExtendedPacket {
	static create(payload: Partial<CreateMinionCampModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: CreateMinionCampModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
		payload.minimapIcon = dvr.readCharArray(64);
		payload.campIndex = dvr.readUint8();
		payload.voComponentRevealEvent = dvr.readUint8();
		payload.teamId = dvr.readUint8();
		payload.timerType = dvr.readInt32();
		payload.expire = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: CreateMinionCampModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
		dvr.writeCharArray(payload.minimapIcon, 64);
		dvr.writeUint8(payload.campIndex);
		dvr.writeUint8(payload.voComponentRevealEvent);
		dvr.writeUint8(payload.teamId);
		dvr.writeInt32(payload.timerType);
		dvr.writeFloat(payload.expire);
	}
}
