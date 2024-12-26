
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import Server from '../app/server';
import loadingStages from '../constants/loading-stages';
import GameObjectList from '../app/game-object-list';

const MapId = {
	SummonersRift_Original: 1, // Summoner's Rift / Original Summer variant
	//summonersRift_OriginalAutumn: 2, // Summoner's Rift / Original Autumn variant
	//TheProvingGrounds: 3, // The Proving Grounds / Tutorial Map
	//TwistedTreeline_Original: 4, // Twisted Treeline / Original Version
	TheCrystalScar: 8, // The Crystal Scar / Dominion map
	TwistedTreeline: 10, // Twisted Treeline / Last TT map
	SummonersRift: 11, // Summoner's Rift / Current Version
	HowlingAbyss: 12, // Howling Abyss / ARAM map
	//ButchersBridge: 14, // Butcher's Bridge / Alternate ARAM map
	//CosmicRuins: 16, // Cosmic Ruins / Dark Star: Singularity map
	//ValoranCityPark: 18, // Valoran City Park / Star Guardian Invasion map
	//Substructure43: 19, // Substructure 43 / PROJECT: Hunters map
	//CrashSite: 20, // Crash Site / Odyssey: Extraction map
	//Convergence: 20, // Convergence / Teamfight Tactics map
	//NexusBlitz: 21, // Nexus Blitz / Nexus Blitz map
};

const VersionString = 'Version 4.20.0.315 [PUBLIC]';


export default (player: Player, packet: packets.SynchVersionC2SModel) => {
	console.log('handle: c2s.SynchVersion');
	//console.log(packet);

	//if(!packet.version.startsWith(VersionString))
	//	return console.log('wrong client version', packet.version);

	let playerInfo = [];
	for (let i = 0; i < 12; i++) {
		let player = GameObjectList.players[i];
		if (!player)
			continue;

		playerInfo.push(player.playerInfo);
	}

	const packet1 = packets.SynchVersion.create({
		versionMatches: true,
		mapToLoad: MapId.SummonersRift_Original,
		versionString: VersionString,
		playerInfo,
		mapMode: 'CLASSIC',
		platformId: 'NA1',
		gameFeatures: {//487890
			foundryOptions: true,
			earlyWarningForFOWMissiles: true,
			itemUndo: true,
			newPlayerRecommendedPages: true,
			highlightLineMissileTargets: true,
			turretRangeIndicators: true,
			goldSourceInfoLogDump: true,
			particleSinNameTech: true,
			hardwareMetrics1: true,
			truLagMetrics: true,
			dradisSd: true,
		},
		enabledDradisMessages: Array(19).fill(true),
	});

	player.network.sendPacket(packet1, loadingStages.notConnected);
	//console.debug(packet1);
};
