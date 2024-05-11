
import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import STipConfig, { STipConfigModel } from '../../shared/STipConfig';
import { PlayerId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type SPlayerInfoModel = {
	playerId: PlayerId,
	summonorLevel: number,
	summonorSpell1: number,
	summonorSpell2: number,
	bitfield: {
		unknown1: boolean,
	},
	team: TeamId,
	botName: string,
	botSkinName: string,
	eloRanking: string,
	botSkinId: number,
	botDifficulty: number,
	profileIconId: number,
	allyBadgeId: number,
	enemyBadgeId: number,
};

export type SynchVersionModel = BasePacketModel & {
	versionMatches: boolean,
	writeToClientFile: boolean,
	matchedGame: boolean,
	dradisInit: boolean,
	mapToLoad: number,
	playerInfo: Partial<SPlayerInfoModel>[],
	versionString: string,
	mapMode: string,
	platformId: string,
	mutators: string[],
	mutatorsNum: number,
	orderRankedTeamName: string,
	orderRankedTeamTag: string,
	chaosRankedTeamName: string,
	chaosRankedTeamTag: string,
	metricsServerWebAddress: string,
	metricsServerWebPath: string,
	metricsServerPort: number,
	dradisProdAddress: string,
	dradisProdResource: string,
	dradisProdPort: number,
	dradisTestAddress: string,
	dradisTestResource: string,
	dradisTestPort: number,
	tipConfig: STipConfigModel,
	gameFeatures: Partial<{
		equalize: boolean,
		foundryOptions: boolean,
		oldOptions: boolean,
		foundryQuicChat: boolean,
		earlyWarningForFOWMissiles: boolean,
		animatedCursors: boolean,
		itemUndo: boolean,
		newPlayerRecommendedPages: boolean,
		highlightLineMissileTargets: boolean,
		controlledChampionIndicator: boolean,
		alternateBountySystem: boolean,
		newMinionSpawnOrder: boolean,
		turretRangeIndicators: boolean,
		goldSourceInfoLogDump: boolean,
		particleSinNameTech: boolean,
		networkMetrics1: boolean,
		hardwareMetrics1: boolean,
		truLagMetrics: boolean,
		dradisSd: boolean,
		serverIpLogging: boolean,
		jungleTimers: boolean,
		traceRouteMetrics: boolean,
		isLolbug19805LoggingEnabled: boolean,
		isLolbug19805HacyTourniquetEnabled: boolean,
		turretMemory: boolean,
		timerSyncForReplay: boolean,
		registerWithLocalServiceDiscovery: boolean,
		minionFarmingBounty: boolean,
		teleportToDestroyedTowers: boolean,
		nonRefCountedCharacterStates: boolean,
		unknown1: boolean,
	}>,
	disabledItems: number[],
	enabledDradisMessages: boolean[],
};

export default class SynchVersion extends BasePacket {
	static create(payload: Partial<SynchVersionModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		versionMatches: 1 << 0,
		writeToClientFile: 1 << 1,
		matchedGame: 1 << 2,
		dradisInit: 1 << 3,
	};

	static gameFeaturesBitfield = {
		equalize: 1 << 0,
		foundryOptions: 1 << 1,
		oldOptions: 1 << 2,
		foundryQuicChat: 1 << 3,
		earlyWarningForFOWMissiles: 1 << 4,
		animatedCursors: 1 << 5,
		itemUndo: 1 << 6,
		newPlayerRecommendedPages: 1 << 7,
		highlightLineMissileTargets: 1 << 8,
		controlledChampionIndicator: 1 << 9,
		alternateBountySystem: 1 << 10,
		newMinionSpawnOrder: 1 << 11,
		turretRangeIndicators: 1 << 12,
		goldSourceInfoLogDump: 1 << 13,
		particleSinNameTech: 1 << 14,
		networkMetrics1: 1 << 15,
		hardwareMetrics1: 1 << 16,
		truLagMetrics: 1 << 17,
		dradisSd: 1 << 18,
		serverIpLogging: 1 << 19,
		jungleTimers: 1 << 20,
		traceRouteMetrics: 1 << 21,
		isLolbug19805LoggingEnabled: 1 << 22,
		isLolbug19805HacyTourniquetEnabled: 1 << 23,
		turretMemory: 1 << 24,
		timerSyncForReplay: 1 << 25,
		registerWithLocalServiceDiscovery: 1 << 26,
		minionFarmingBounty: 1 << 27,
		teleportToDestroyedTowers: 1 << 28,
		nonRefCountedCharacterStates: 1 << 29,
		unknown1: 1 << 30,
	};

	static SPlayerInfoBitfield1 = {
		unknown1: 1 << 0,
	}

	static SPlayerInfo_reader(dvr: RelativeDataView, payload: SPlayerInfoModel) {
		payload.playerId = dvr.readInt64();
		payload.summonorLevel = dvr.readUint16();
		payload.summonorSpell1 = dvr.readUint32();
		payload.summonorSpell2 = dvr.readUint32();
		payload.bitfield = dvr.readBitfield(this.SPlayerInfoBitfield1);
		payload.team = dvr.readInt32();
		//payload.botName = dvr.readCharArray(64);
		//payload.botSkinName = dvr.readCharArray(64);
		//payload.eloRanking = dvr.readCharArray(16);
		//payload.botSkinId = dvr.readInt32();
		dvr.readCharArray(28);
		dvr.readCharArray(28);
		payload.botDifficulty = dvr.readInt32();
		payload.profileIconId = dvr.readInt32();
		//payload.allyBadgeId = dvr.readUint8();
		//payload.enemyBadgeId = dvr.readUint8();
	}

	static reader(dvr: RelativeDataView, payload: SynchVersionModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.versionMatches = bitfield1.versionMatches;
		payload.writeToClientFile = bitfield1.writeToClientFile;
		payload.matchedGame = bitfield1.matchedGame;
		payload.dradisInit = bitfield1.dradisInit;

		payload.mapToLoad = dvr.readInt32();
		payload.playerInfo = dvr.readArray(() => {
			let playerInfo = {} as SPlayerInfoModel;
			this.SPlayerInfo_reader(dvr, playerInfo);
			return playerInfo;
		}, 12);
		payload.versionString = dvr.readCharArray(256);
		payload.mapMode = dvr.readCharArray(128);
		//payload.platformId = dvr.readCharArray(32);
		//payload.mutators = dvr.readArray(() => dvr.readCharArray(64), 8);
		//payload.mutatorsNum = dvr.readUint8();
		//payload.orderRankedTeamName = dvr.readCharArray(97);
		//payload.orderRankedTeamTag = dvr.readCharArray(25);
		//payload.chaosRankedTeamName = dvr.readCharArray(97);
		//payload.chaosRankedTeamTag = dvr.readCharArray(25);
		//payload.metricsServerWebAddress = dvr.readCharArray(256);
		//payload.metricsServerWebPath = dvr.readCharArray(256);
		//payload.metricsServerPort = dvr.readUint16();
		//payload.dradisProdAddress = dvr.readCharArray(256);
		//payload.dradisProdResource = dvr.readCharArray(256);
		//payload.dradisProdPort = dvr.readUint16();
		//payload.dradisTestAddress = dvr.readCharArray(256);
		//payload.dradisTestResource = dvr.readCharArray(256);
		//payload.dradisTestPort = dvr.readUint16();
		//payload.tipConfig = STipConfig.read(dvr);
		//
		//let gameFeaturesBitfield = dvr.readBitfield64(this.gameFeaturesBitfield);
		//payload.gameFeatures = gameFeaturesBitfield;
		//
		//payload.disabledItems = dvr.readArray(() => dvr.readUint32(), 64);
		//payload.enabledDradisMessages = dvr.readArray(() => dvr.readBool(), 19);
	}

	static SPlayerInfo_writer(dvr: RelativeDataView, payload: Partial<SPlayerInfoModel>) {
		payload = payload || { /*playerId: -1*/ } as Partial<SPlayerInfoModel>;
		dvr.writeInt64(payload.playerId);
		dvr.writeUint16(payload.summonorLevel);
		dvr.writeUint32(payload.summonorSpell1);
		dvr.writeUint32(payload.summonorSpell2);
		dvr.writeBitfield(this.SPlayerInfoBitfield1, payload.bitfield || {});
		dvr.writeInt32(payload.team);
		//dvr.writeCharArray(payload.botName, 64);
		//dvr.writeCharArray(payload.botSkinName, 64);
		//dvr.writeCharArray(payload.eloRanking, 16);
		//dvr.writeInt32(payload.botSkinId);
		dvr.writeCharArray('', 28);
		dvr.writeCharArray('', 28);
		dvr.writeInt32(payload.botDifficulty);
		dvr.writeInt32(payload.profileIconId);
		//dvr.writeUint8(payload.allyBadgeId);
		//dvr.writeUint8(payload.enemyBadgeId);
	}

	static writer(dvr: RelativeDataView, payload: SynchVersionModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			versionMatches: payload.versionMatches,
			writeToClientFile: payload.writeToClientFile,
			matchedGame: payload.matchedGame,
			dradisInit: payload.dradisInit,
		});

		dvr.writeInt32(payload.mapToLoad);
		dvr.writeArray(payload.playerInfo, v => this.SPlayerInfo_writer(dvr, v), 12);
		dvr.writeCharArray(payload.versionString, 256);
		dvr.writeCharArray(payload.mapMode, 128);
		//dvr.writeCharArray(payload.platformId, 32);
		//
		//dvr.writeArray(payload.mutators, v => dvr.writeCharArray(v, 64), 8);
		//dvr.writeUint8(payload.mutatorsNum);
		//dvr.writeCharArray(payload.orderRankedTeamName, 97);
		//dvr.writeCharArray(payload.orderRankedTeamTag, 25);
		//dvr.writeCharArray(payload.chaosRankedTeamName, 97);
		//dvr.writeCharArray(payload.chaosRankedTeamTag, 25);
		//dvr.writeCharArray(payload.metricsServerWebAddress, 256);
		//dvr.writeCharArray(payload.metricsServerWebPath, 256);
		//dvr.writeUint16(payload.metricsServerPort);
		//dvr.writeCharArray(payload.dradisProdAddress, 256);
		//dvr.writeCharArray(payload.dradisProdResource, 256);
		//dvr.writeUint16(payload.dradisProdPort);
		//dvr.writeCharArray(payload.dradisTestAddress, 256);
		//dvr.writeCharArray(payload.dradisTestResource, 256);
		//dvr.writeUint16(payload.dradisTestPort);
		//STipConfig.writer(dvr, payload.tipConfig);
		//
		//dvr.writeBitfield64(this.gameFeaturesBitfield, payload.gameFeatures);
		//
		//dvr.writeArray(payload.disabledItems, v => dvr.writeUint32(v), 64);
		//dvr.writeArray(payload.enabledDradisMessages, v => dvr.writeBool(v), 19);
	}
}
