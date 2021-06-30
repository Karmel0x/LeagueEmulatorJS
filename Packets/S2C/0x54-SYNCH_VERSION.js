var BasePacket = require('../BasePacket');
var TipConfig = require('../SharedStruct/TipConfig');

var PlayerInfo = {
	PlayerID: 'int64',
	SummonorLevel: 'uint16',
	SummonorSpell1: 'uint32',
	SummonorSpell2: 'uint32',
	Bitfield: 'uint8',
	TeamId: 'uint32',
	BotName: ['char', 64],
	BotSkinName: ['char', 64],
	EloRanking: ['char', 16],
	BotSkinID: 'int32',
	BotDifficulty: 'int32',
	ProfileIconId: 'int32',
	AllyBadgeID: 'uint8',
	EnemyBadgeID: 'uint8',
};
//54 00 00 00 00 01 00 00 00 01 00 00 00 00 00 00 00 1e 00 1c af 64 03 a8 6e 49 06 00 64 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
//54 00 00 00 00 01 01 00 00 00 01 00 00 00 00 00 00 00 1e 00 1c af 64 03 a8 6e 49 06 00 64 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
module.exports = class extends BasePacket {//S2C.SYNCH_VERSION
	struct = {
		//bitField: 'uint8',
		bitField: ['bitfield', {
			VersionMatches: 1,
			WriteToClientFile: 2,
			MatchedGame: 4,
			DradisInit: 8,
		}],
		MapToLoad: 'int32',
		PlayerInfo: [PlayerInfo, 12],
		VersionString: ['char', 256],
		MapMode: ['char', 128],
		PlatformID: ['char', 32],
		Mutators: [['char', 64], 8],
		MutatorsNum: 'uint8',
		OrderRankedTeamName: ['char', 97],
		OrderRankedTeamTag: ['char', 25],
		ChaosRankedTeamName: ['char', 97],
		ChaosRankedTeamTag: ['char', 25],
		MetricsServerWebAddress: ['char', 256],
		MetricsServerWebPath: ['char', 256],
		MetricsServerPort: 'uint16',
		DradisProdAddress: ['char', 256],
		DradisProdResource: ['char', 256],
		DradisProdPort: 'uint16',
		DradisTestAddress: ['char', 256],
		DradisTestResource: ['char', 256],
		DradisTestPort: 'uint16',
		TipConfig: TipConfig,
		idk: 'uint8',
		GameFeatures: 'uint64',
		DisabledItems: ['uint32', 64],
		EnabledDradisMessages: ['uint8', 19],
	}
};
