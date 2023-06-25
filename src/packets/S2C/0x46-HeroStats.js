const BasePacket = require('../BasePacket');

/**
 * @todo
 */
const ChampionStats = {
	Assists: 'int32',//[FieldOffset(0)]
	unk1: 'int32',//public int _Assists;
	Kills: 'int32',//[FieldOffset(8)]
	unk2: 'int32',//public int _Kills;
	DoubleKills: 'int32',//[FieldOffset(16)]
	unk3: ['int32', 3],//public int _DoubleKills;
	//[FieldOffset(32)]
	UnrealKills: 'int32',//public int _UnrealKills;
	//[FieldOffset(36)]
	GoldEarned: 'float',//public float _GoldEarned;
	GoldSpent: 'float',//[FieldOffset(40)]
	unk4: ['int32', 10],//public float _GoldSpent;
	CurrentKillingSpree: 'int32',//[FieldOffset(84)]
	//public int _CurrentKillingSpree;
	LargestCriticalStrike: 'float',//[FieldOffset(88)]
	//public float _LargestCriticalStrike;
	LargestKillingSpree: 'int32',//[FieldOffset(92)]
	//public int _LargestKillingSpree;
	LargestMultiKill: 'int32',//[FieldOffset(96)]
	unk5: 'float',//public int _LargestMultiKill;
	LongestTimeSpentLiving: 'float',//[FieldOffset(104)]
	//public float _LongestTimeSpentLiving;
	MagicDamageDealt: 'float',//[FieldOffset(108)]
	//public float _MagicDamageDealt;
	MagicDamageDealtToChampions: 'float',//[FieldOffset(112)]
	//public float _MagicDamageDealtToChampions;
	MagicDamageTaken: 'float',//[FieldOffset(116)]
	//public float _MagicDamageTaken;
	MinionsKilled: 'int32',//[FieldOffset(120)]
	unk6: 'int16',//public int _MinionsKilled;
	NeutralMinionsKilled: 'int32',//[FieldOffset(126)]
	//public int _NeutralMinionsKilled;
	NeutralMinionsKilledInEnemyJungle: 'int32',//[FieldOffset(130)]
	//public int _NeutralMinionsKilledInEnemyJungle;
	//[FieldOffset(134)]
	NeutralMinionsKilledInTeamJungle: 'int32',//public int _NeutralMinionsKilledInTeamJungle;
	unk7: 'int32',//[FieldOffset(142)]
	Deaths: 'int32',//public int _Deaths;
	//[FieldOffset(146)]
	PentaKills: 'int32',//public int _PentaKills;
	//[FieldOffset(150)]
	PhysicalDamageDealt: 'float',//public float _PhysicalDamageDealt;
	//[FieldOffset(154)]
	PhysicalDamageDealtToChampions: 'float',//public float _PhysicalDamageDealtToChampions;
	//[FieldOffset(158)]
	PhysicalDamageTaken: 'float',//public float _PhysicalDamageTaken;
	unk8: 'int32',//[FieldOffset(166)]
	QuadraKills: 'int32',//public int _QuadraKills;
	unk9: ['int32', 9],//[FieldOffset(206)]
	teamId: 'int32',//public int _TeamId;
	unk10: ['int32', 4],//[FieldOffset(226)]
	TotalDamageDealt: 'float',//public float _TotalDamageDealt;
	//[FieldOffset(230)]
	TotalDamageDealtToChampions: 'float',//public float _TotalDamageDealtToChampions;
	//[FieldOffset(234)]
	TotalDamageTaken: 'float',//public float _TotalDamageTaken;
	//[FieldOffset(238)]
	TotalHeal: 'int32',//public int _TotalHeal;
	//[FieldOffset(242)]
	TotalTimeCrowdControlDealt: 'float',//public float _TotalTimeCrowdControlDealt;
	//[FieldOffset(246)]
	TotalTimeSpentDead: 'float',//public float _TotalTimeSpentDead;
	//[FieldOffset(250)]
	TotalUnitsHealed: 'int32',//public int _TotalUnitsHealed;
	//[FieldOffset(254)]
	TripleKills: 'int32',//public int _TripleKills;
	//[FieldOffset(258)]
	TrueDamageDealt: 'float',//public float _TrueDamageDealt;
	//[FieldOffset(262)]
	TrueDamageDealtToChampions: 'float',//public float _TrueDamageDealtToChampions;
	//[FieldOffset(266)]
	TrueDamageTaken: 'float',//public float _TrueDamageTaken;
	//[FieldOffset(270)]
	TurretsKilled: 'int32',//public int _TurretsKilled;
	//[FieldOffset(274)]
	BarracksKilled: 'int32',//public int _BarracksKilled;
	//[FieldOffset(282)]
	WardsKilled: 'int32',//public int _WardsKilled;
	//[FieldOffset(286)]
	WardsPlaced: 'int32',//public int _WardsPlaced;
	unk11: ['int32', 2],
	//[FieldOffset(298)]////// sort of length (when above 0 sends malformed buffer error)
	Padding: 'int16',//public short Padding;
	unk12: 'int32',
};

module.exports = class HeroStats extends BasePacket {
	static struct = {
		size: 'int32',
		data: ChampionStats,//['uint8', 'size|-4'],
	}
};
