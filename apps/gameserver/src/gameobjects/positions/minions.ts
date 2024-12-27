import { Vector2 } from '@repo/geometry';
import { LaneId, TeamId } from '../extensions/traits/team';
import { BarrackOptions } from '../spawners/barrack';

export const barracks: BarrackOptions[] = [
    //0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{x: 1533.0, y: 1321.0}
    {
        netId: 0xFFEB364C,//0x42EB364C
        position: { x: 917.7302, y: 1720.3623 },//,z:140.0677
        name: '__P_Order_Spawn_Barracks__L01',
        team: TeamId.order,
        lane: LaneId.bot,
    },
    {
        netId: 0xFFB77171,//0x49B77171
        position: { x: 1418.3711, y: 1686.375 },//,z:134.7595
        name: '__P_Order_Spawn_Barracks__C01',
        team: TeamId.order,
        lane: LaneId.mid,
    },
    {
        netId: 0xFF53B836,//0x5453B836
        position: { x: 1487.0896, y: 1302.0958 },//,z:144.2386
        name: '__P_Order_Spawn_Barracks__R01',
        team: TeamId.order,
        lane: LaneId.top,
    },
    {
        netId: 0xFFE647D5,//0x72E647D5
        position: { x: 12451.051, y: 13217.542 },//,z:143.9473
        name: '__P_Chaos_Spawn_Barracks__L01',
        team: TeamId.chaos,
        lane: LaneId.bot,
    },
    {
        netId: 0xFFBA00E8,//0x79BA00E8
        position: { x: 12511.773, y: 12776.932 },//,z:126.2741
        name: '__P_Chaos_Spawn_Barracks__C01',
        team: TeamId.chaos,
        lane: LaneId.mid,
    },
    {
        netId: 0xFF5EC9AF,//0x645EC9AF
        position: { x: 13062.496, y: 12760.784 },//,z:134.706 
        name: '__P_Chaos_Spawn_Barracks__R01',
        team: TeamId.chaos,
        lane: LaneId.top,
    },
];

export const minionLanePaths = {
    [TeamId.order]: [
        [
            new Vector2(1487, 1302),
            new Vector2(3789, 1346),
            new Vector2(6430, 1005),
            new Vector2(10995, 1234),
            new Vector2(12841, 3051),
            new Vector2(13148, 4202),
            new Vector2(13249, 7884),
            new Vector2(12886, 10356),
            new Vector2(12511, 12776)
        ],
        [
            new Vector2(1418, 1686),
            new Vector2(2997, 2781),
            new Vector2(4472, 4727),
            new Vector2(8375, 8366),
            new Vector2(10948, 10821),
            new Vector2(12511, 12776)
        ],
        [
            new Vector2(917, 1725),
            new Vector2(1170, 4041),
            new Vector2(861, 6459),
            new Vector2(880, 10180),
            new Vector2(1268, 11675),
            new Vector2(2806, 13075),
            new Vector2(3907, 13243),
            new Vector2(7550, 13407),
            new Vector2(10244, 13238),
            new Vector2(10947, 13135),
            new Vector2(12511, 12776)
        ],
    ],
    [TeamId.chaos]: [
        [
            new Vector2(13062, 12760),
            new Vector2(12886, 10356),
            new Vector2(13249, 7884),
            new Vector2(13148, 4202),
            new Vector2(12841, 3051),
            new Vector2(10995, 1234),
            new Vector2(6430, 1005),
            new Vector2(3789, 1346),
            new Vector2(1418, 1686)
        ],
        [
            new Vector2(12511, 12776),
            new Vector2(10948, 10821),
            new Vector2(8375, 8366),
            new Vector2(4472, 4727),
            new Vector2(2997, 2781),
            new Vector2(1418, 1686)
        ],
        [
            new Vector2(12451, 13217),
            new Vector2(10947, 13135),
            new Vector2(10244, 13238),
            new Vector2(7550, 13407),
            new Vector2(3907, 13243),
            new Vector2(2806, 13075),
            new Vector2(1268, 11675),
            new Vector2(880, 10180),
            new Vector2(861, 6459),
            new Vector2(1170, 4041),
            new Vector2(1418, 1686)
        ],
    ],
};
