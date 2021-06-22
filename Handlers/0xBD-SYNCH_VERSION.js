
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const TEAM = require("../Constants/TEAM");

const SummonerSpells = {
	IGNITE: 106858133,
	q: 0x0364af1c,
	w: 0x06496ea8,
};

module.exports = function(q){
	console.log('handle: C2S.SYNCH_VERSION');

	{
		var obj1 = q.packet.readobj(Packets.C2S.SYNCH_VERSION.packet);
		q.packet.off = 0;
		console.log(obj1);
	}

	var SYNCH_VERSION = createPacket('SYNCH_VERSION');
	
	var bitfield = 0;
	//if (VersionMatches)
		bitfield |= 1;
	//if (WriteToClientFile)
	//    bitfield |= 2;
	//if (MatchedGame)
	//    bitfield |= 4;
	//if (DradisInit)
	//    bitfield |= 8;
	
	SYNCH_VERSION.packet.bitField = bitfield;
	SYNCH_VERSION.packet.MapToLoad = 1;
	SYNCH_VERSION.packet.VersionString = 'Version 4.20.0.315 [PUBLIC]';

	SYNCH_VERSION.packet.PlayerInfo = [
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
	SYNCH_VERSION.packet.MapMode = 'CLASSIC';
	SYNCH_VERSION.packet.PlatformID = 'NA1';
	//SYNCH_VERSION.packet.GameFeatures = 0;
	//SYNCH_VERSION.packet.GameFeatures |= (1 << 0x1);
	//SYNCH_VERSION.packet.GameFeatures |= (1 << 0x4);
	//SYNCH_VERSION.packet.GameFeatures |= (1 << 0x7);
	//SYNCH_VERSION.packet.GameFeatures |= (1 << 0x8);
	//SYNCH_VERSION.packet.GameFeatures |= (1 << 0x6);
	SYNCH_VERSION.packet.GameFeatures = 487826;
	SYNCH_VERSION.packet.EnabledDradisMessages = [];
	for(let i = 0; i < 19; i++)
		SYNCH_VERSION.packet.EnabledDradisMessages[i] = true;

	var isSent = sendPacket(SYNCH_VERSION);
};
