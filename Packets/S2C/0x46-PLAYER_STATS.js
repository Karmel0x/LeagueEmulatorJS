
/*var ChampionStats = {
    [FieldOffset(0)]
    public int _Assists;
    [FieldOffset(8)]
    public int _Kills;
    [FieldOffset(16)]
    public int _DoubleKills;
    [FieldOffset(32)]
    public int _UnrealKills;
    [FieldOffset(36)]
    public float _GoldEarned;
    [FieldOffset(40)]
    public float _GoldSpent;
    [FieldOffset(84)]
    public int _CurrentKillingSpree;
    [FieldOffset(88)]
    public float _LargestCriticalStrike;
    [FieldOffset(92)]
    public int _LargestKillingSpree;
    [FieldOffset(96)]
    public int _LargestMultiKill;
    [FieldOffset(104)]
    public float _LongestTimeSpentLiving;
    [FieldOffset(108)]
    public float _MagicDamageDealt;
    [FieldOffset(112)]
    public float _MagicDamageDealtToChampions;
    [FieldOffset(116)]
    public float _MagicDamageTaken;
    [FieldOffset(120)]
    public int _MinionsKilled;
    [FieldOffset(126)]
    public int _NeutralMinionsKilled;
    [FieldOffset(130)]
    public int _NeutralMinionsKilledInEnemyJungle;
    [FieldOffset(134)]
    public int _NeutralMinionsKilledInTeamJungle;
    [FieldOffset(142)]
    public int _Deaths;
    [FieldOffset(146)]
    public int _PentaKills;
    [FieldOffset(150)]
    public float _PhysicalDamageDealt;
    [FieldOffset(154)]
    public float _PhysicalDamageDealtToChampions;
    [FieldOffset(158)]
    public float _PhysicalDamageTaken;
    [FieldOffset(166)]
    public int _QuadraKills;
    [FieldOffset(206)]
    public int _TeamId;
    [FieldOffset(226)]
    public float _TotalDamageDealt;
    [FieldOffset(230)]
    public float _TotalDamageDealtToChampions;
    [FieldOffset(234)]
    public float _TotalDamageTaken;
    [FieldOffset(238)]
    public int _TotalHeal;
    [FieldOffset(242)]
    public float _TotalTimeCrowdControlDealt;
    [FieldOffset(246)]
    public float _TotalTimeSpentDead;
    [FieldOffset(250)]
    public int _TotalUnitsHealed;
    [FieldOffset(254)]
    public int _TripleKills;
    [FieldOffset(258)]
    public float _TrueDamageDealt;
    [FieldOffset(262)]
    public float _TrueDamageDealtToChampions;
    [FieldOffset(266)]
    public float _TrueDamageTaken;
    [FieldOffset(270)]
    public int _TurretsKilled;
    [FieldOffset(274)]
    public int _BarracksKilled;
    [FieldOffset(282)]
    public int _WardsKilled;
    [FieldOffset(286)]
    public int _WardsPlaced;
    [FieldOffset(298)]
    // sort of length (when above 0 sends malformed buffer error)
    public short Padding;
};*/
var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.PLAYER_STATS
	struct = {
        size: 'int32',
        data: ['uint8', 'size|-4'],
    }
};
