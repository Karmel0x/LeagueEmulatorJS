import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum ScoreCategory {
	offense = 0x0,
	defense = 0x1,
	combat = 0x2,
	objective = 0x3,
};

export enum ScoreEvent {
	champKill = 0x0,
	champAssist = 0x1,
	nodeCapture = 0x2,
	nodeNeutralize = 0x3,
	nodeKillOffense = 0x4,
	teamObjective = 0x5,
	defendPointNeutralize = 0x6,
	nodeKillDefense = 0x7,
	nodeTimeDefense = 0x8,
	lastStand = 0x9,
	defensiveAssist = 0xa,
	defensiveKill = 0xb,
	offensiveAssist = 0xc,
	offensiveKill = 0xd,
	championKill = 0xe,
	championAssist = 0xf,
	ace = 0x10,
	questComplete = 0x11,
	sentinel = 0x12,
	duelist = 0x13,
	guardian = 0x14,
	doubleKill = 0x15,
	tripleKill = 0x16,
	quadraKill = 0x17,
	pentaKill = 0x18,
	killingSpree = 0x19,
	rampage = 0x1a,
	unstoppable = 0x1b,
	dominating = 0x1c,
	godLike = 0x1d,
	legendary = 0x1e,
	minionKill = 0x1f,
	superMinionKill = 0x20,
	avenger = 0x21,
	bountyHunter2 = 0x22,
	bountyHunter3 = 0x23,
	bountyHunter4 = 0x24,
	bountyHunter5 = 0x25,
	bountyHunter6 = 0x26,
	bountyHunter7 = 0x27,
	bountyHunter8 = 0x28,
	payback = 0x29,
	angel = 0x2a,
	archAngel = 0x2b,
	scavengerHunt = 0x2c,
	zoneCapture = 0x2d,
	zoneNeutralize = 0x2e,
	survivor = 0x2f,
	defender = 0x30,
	counter = 0x31,
	opportunist = 0x32,
	strategist = 0x33,
	firstBlood = 0x34,
	vanguard = 0x35,
	majorRelicPickup = 0x36,
	nodeCaptureAssist = 0x37,
	nodeNeutralizeAssist = 0x38,
	reconnect = 0x39,
};

export type IncrementPlayerScoreModel = BasePacketModel & {
	playerNetId: NetId,
	scoreCategory: ScoreCategory,
	scoreEvent: ScoreEvent,
	shouldCallout: boolean,
	pointValue: number,
	totalPointValue: number,
};

/**
 * Used for dominion game mode
 */
export default class IncrementPlayerScore extends BasePacket {
	static create(payload: Partial<IncrementPlayerScoreModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		shouldCallout: 1,
	};

	static reader(dvr: RelativeDataView, payload: IncrementPlayerScoreModel) {
		super.reader(dvr, payload);

		payload.playerNetId = dvr.readUint32();
		payload.scoreCategory = dvr.readUint8();
		payload.scoreEvent = dvr.readUint8();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.shouldCallout = bitfield1.shouldCallout;

		payload.pointValue = dvr.readFloat();
		payload.totalPointValue = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: IncrementPlayerScoreModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.playerNetId);
		dvr.writeUint8(payload.scoreCategory);
		dvr.writeUint8(payload.scoreEvent);

		dvr.writeBitfield(this.bitfield1, {
			shouldCallout: payload.shouldCallout,
		});

		dvr.writeFloat(payload.pointValue);
		dvr.writeFloat(payload.totalPointValue);
	}
}
