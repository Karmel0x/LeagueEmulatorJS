
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const TEAM = require("../Constants/TEAM");

const SummonerSpells = {
	IGNITE: 106858133,
	q: 0x0364af1c,
	w: 0x06496ea8,
};

module.exports = function(q, obj1){
	console.log('handle: C2S.SYNCH_VERSION');
	console.log(obj1);


	var SYNCH_VERSION = createPacket('SYNCH_VERSION');
	
	SYNCH_VERSION.bitField = {
		VersionMatches: true,
	};
	SYNCH_VERSION.MapToLoad = 1;
	SYNCH_VERSION.VersionString = 'Version 4.20.0.315 [PUBLIC]';

	SYNCH_VERSION.PlayerInfo = [
		{
			PlayerID: 1,
			SummonorLevel: 30,
			SummonorSpell1: SummonerSpells.q,
			SummonorSpell2: SummonerSpells.w,
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
	//SYNCH_VERSION.GameFeatures = 0;
	//SYNCH_VERSION.GameFeatures |= (1 << 0x1);
	//SYNCH_VERSION.GameFeatures |= (1 << 0x4);
	//SYNCH_VERSION.GameFeatures |= (1 << 0x7);
	//SYNCH_VERSION.GameFeatures |= (1 << 0x8);
	//SYNCH_VERSION.GameFeatures |= (1 << 0x6);
	SYNCH_VERSION.GameFeatures = 487826;
	SYNCH_VERSION.EnabledDradisMessages = [];
	for(let i = 0; i < 19; i++)
		SYNCH_VERSION.EnabledDradisMessages[i] = true;

	console.log(SYNCH_VERSION);
	var isSent = sendPacket(SYNCH_VERSION);
};
