
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
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

const VersionString = 'Version 4.20.0.315 [PUBLIC]';

module.exports = (player, packet) => {
	console.log('handle: C2S.SYNCH_VERSION');
	//console.log(packet);

	//if(!packet.version.startsWith(VersionString))
	//	return console.log('wrong client version', packet.version);

	var SYNCH_VERSION = createPacket('SYNCH_VERSION');
	
	SYNCH_VERSION.bitField = {
		VersionMatches: true,
	};
	SYNCH_VERSION.MapToLoad = 1;
	SYNCH_VERSION.VersionString = VersionString;

	SYNCH_VERSION.PlayerInfo = [
		{
			PlayerID: 1,
			SummonorLevel: 30,
			SummonorSpell1: SummonerSpells.HEAL,
			SummonorSpell2: SummonerSpells.FLASH,
			Bitfield: 0,//108
			TeamId: TEAM.BLUE,
			BotName: '',
			BotSkinName: '',
			EloRanking: "DIAMOND",
			BotSkinID: 0,
			BotDifficulty: 0,
			ProfileIconId: 0,//666,
			AllyBadgeID: 2,
			EnemyBadgeID: 0,
		},
		{PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1},
		{PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1},
	];
	SYNCH_VERSION.MapMode = 'CLASSIC';
	SYNCH_VERSION.PlatformID = 'NA1';
	//let GameFeatures = 0;
	//GameFeatures |= (1 << 18);
	//GameFeatures |= (1 << 17);
	//GameFeatures |= (1 << 16);
	//GameFeatures |= (1 << 14);
	//GameFeatures |= (1 << 13);
	//GameFeatures |= (1 << 12);
	//GameFeatures |= (1 << 8);
	//GameFeatures |= (1 << 7);
	//GameFeatures |= (1 << 4);
	//GameFeatures |= (1 << 1);
	SYNCH_VERSION.GameFeatures = 487826;
	SYNCH_VERSION.EnabledDradisMessages = [];
	for(let i = 0; i < 19; i++)
		SYNCH_VERSION.EnabledDradisMessages[i] = true;

	console.log(SYNCH_VERSION);
	var isSent = player.sendPacket(SYNCH_VERSION);
};
