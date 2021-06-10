
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
	console.log('handle: C2S_SYNCH_VERSION');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_SYNCH_VERSION.packet);
		q.packet.off = 0;
		console.log(obj1);
	}

	var S2C_SYNCH_VERSION = createPacket('S2C_SYNCH_VERSION');
	
	var bitfield = 0;
	//if (VersionMatches)
		bitfield |= 1;
	//if (WriteToClientFile)
	//    bitfield |= 2;
	//if (MatchedGame)
	//    bitfield |= 4;
	//if (DradisInit)
	//    bitfield |= 8;
	
	S2C_SYNCH_VERSION.packet.bitField = bitfield;
	S2C_SYNCH_VERSION.packet.MapToLoad = 1;
	S2C_SYNCH_VERSION.packet.VersionString = 'Version 4.20.0.315 [PUBLIC]';

	S2C_SYNCH_VERSION.packet.PlayerInfo = [
		{
			PlayerID: 1,
			SummonorLevel: 30,
			SummonorSpell1: 106858133,
			SummonorSpell2: 0,
			Bitfield: 108,
			TeamId: 0x64,
			BotName: '',
			BotSkinName: '',
			EloRanking: "BRONZE",
			BotSkinID: 0,
			BotDifficulty: 0,
			ProfileIconId: 666,
			AllyBadgeID: 0,
			EnemyBadgeID: 0,
		},
		{PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1},
		{PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1}, {PlayerID: -1},
	];
	S2C_SYNCH_VERSION.packet.MapMode = 'CLASSIC';
	S2C_SYNCH_VERSION.packet.PlatformID = 'EUW';
	S2C_SYNCH_VERSION.packet.GameFeatures = 0;
	S2C_SYNCH_VERSION.packet.GameFeatures |= (1 << 0x1);
	S2C_SYNCH_VERSION.packet.GameFeatures |= (1 << 0x4);
	S2C_SYNCH_VERSION.packet.GameFeatures |= (1 << 0x7);
	S2C_SYNCH_VERSION.packet.GameFeatures |= (1 << 0x8);
	S2C_SYNCH_VERSION.packet.GameFeatures |= (1 << 0x6);

	var isSent = sendPacket(S2C_SYNCH_VERSION);
};
