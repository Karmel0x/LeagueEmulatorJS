
const loadingStages = require("../Constants/loadingStages");

const TEAM = require("../Constants/TEAM");

const SummonerSpells = {
	REVIVE: 0x05C8B3A5,
	SMITE: 0x065E8695,
	EXHAUST: 0x08A8BAE4,
	BARRIER: 0x0CCFB982,
	TELEPORT: 0x004F1364,
	GHOST: 0x064ACC95,
	HEAL: 0x0364AF1C,
	CLEANSE: 0x064D2094,
	CLARITY: 0x03657421,
	IGNITE: 0x06364F24,
	PROMOTE: 0x0410FF72,
	CLAIR: 0x09896765,
	FLASH: 0x06496EA8,
	TEST: 0x0103D94C
};
const MapId = {
	SummonersRift_Original: 1, // Summoner's Rift / Original Summer variant
	SummonersRift_OriginalAutumn: 2, // Summoner's Rift / Original Autumn variant
	//TheProvingGrounds: 3, // The Proving Grounds / Tutorial Map
	//TwistedTreeline_Original: 4, // Twisted Treeline / Original Version
	//TheCrystalScar: 8, // The Crystal Scar / Dominion map
	//TwistedTreeline: 10, // Twisted Treeline / Last TT map
	SummonersRift: 11, // Summoner's Rift / Current Version
	//HowlingAbyss: 12, // Howling Abyss / ARAM map
	//ButchersBridge: 14, // Butcher's Bridge / Alternate ARAM map
	//CosmicRuins: 16, // Cosmic Ruins / Dark Star: Singularity map
	//ValoranCityPark: 18, // Valoran City Park / Star Guardian Invasion map
	//Substructure43: 19, // Substructure 43 / PROJECT: Hunters map
	//CrashSite: 20, // Crash Site / Odyssey: Extraction map
	//Convergence: 20, // Convergence / Teamfight Tactics map
	//NexusBlitz: 21, // Nexus Blitz / Nexus Blitz map
};

const VersionString = 'Version 4.20.0.315 [PUBLIC]';

module.exports = (player, packet) => {
	console.log('handle: C2S.SynchVersion');
	//console.log(packet);

	//if(!packet.version.startsWith(VersionString))
	//	return console.log('wrong client version', packet.version);

	var SynchVersion = global.Network.createPacket('SynchVersion');
	
	SynchVersion.bitfield = {
		versionMatches: true,
	};
	SynchVersion.mapToLoad = MapId.SummonersRift_Original;
	SynchVersion.versionString = VersionString;

	SynchVersion.playerInfo = [];
	for(let i = 0; i < 12; i++)
		SynchVersion.playerInfo.push(global.Players[i] ? global.Players[i].playerInfo : {playerId: -1});

	SynchVersion.mapMode = 'CLASSIC';
	SynchVersion.platformId = 'NA1';
	SynchVersion.gameFeatures = {//487890
		FoundryOptions: true,
		EarlyWarningForFOWMissiles: true,
		ItemUndo: true,
		NewPlayerRecommendedPages: true,
		HighlightLineMissileTargets: true,
		TurretRangeIndicators: true,
		GoldSourceInfoLogDump: true,
		ParticleSinNameTech: true,
		HardwareMetrics_1: true,
		TruLagMetrics: true,
		DradisSD: true,
	};
	SynchVersion.enabledDradisMessages = [];
	for(let i = 0; i < 19; i++)
		SynchVersion.enabledDradisMessages[i] = true;

	player.sendPacket(SynchVersion, loadingStages.NOT_CONNECTED);
	//console.debug(SynchVersion);
};
