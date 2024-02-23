import { Vector2 } from 'three';
import Team, { TeamId } from '../extensions/traits/team';
import type { NexusOptions } from '../units/nexus';

export const nexuses: { [n: number]: { [n: number]: NexusOptions }; } = {
    [TeamId.order]: {
        0: { netId: 0xFFF97DB5, position: { x: 1131.728, y: 1426.288 }, info: { name: 'HQ_T1' }, character: 'OrderNexus' }//4294540725
    },
    [TeamId.chaos]: {
        0: { netId: 0xFFF02C0F, position: { x: 12760.906, y: 13026.066 }, info: { name: 'HQ_T2' }, character: 'ChaosNexus' },//4293929999
    },
};

export const inhibitors = {
    [TeamId.order]: {
        0: { netId: 0xFFD23C3E, position: { x: 823.7, y: 3361.6 }, info: { name: 'Barracks_T1_R1' }, character: 'OrderInhibitor' },//4291968062
        1: { netId: 0xFF4A20F1, position: { x: 2785.5, y: 2958.2 }, info: { name: 'Barracks_T1_C1' }, character: 'OrderInhibitor' },//4283048177
        2: { netId: 0xFF9303E1, position: { x: 3036.3, y: 1017.6 }, info: { name: 'Barracks_T1_L1' }, character: 'OrderInhibitor' },//4287824865
    },
    [TeamId.chaos]: {
        0: { netId: 0xFF6793D0, position: { x: 10958.791, y: 13434.588 }, info: { name: 'Barracks_T2_R1' }, character: 'ChaosInhibitor' },//4284978128
        1: { netId: 0xFFFF8F1F, position: { x: 11238.580, y: 11470.119 }, info: { name: 'Barracks_T2_C1' }, character: 'ChaosInhibitor' },//4294938399
        2: { netId: 0xFF26AC0F, position: { x: 13208.756, y: 11174.174 }, info: { name: 'Barracks_T2_L1' }, character: 'ChaosInhibitor' },//4280724495
    },
};

export const turrets = {
    [TeamId.order]: {
        0: { position: { x: 10097.618, y: 808.733 }, info: { name: 'Turret_T1_R_03_A' }, character: 'OrderTurretNormal2' },//outer
        1: { position: { x: 6512.527, y: 1262.615 }, info: { name: 'Turret_T1_R_02_A' }, character: 'OrderTurretNormal' },//inner
        2: { position: { x: 3747.255, y: 1041.044 }, info: { name: 'Turret_T1_C_07_A' }, character: 'OrderTurretDragon' },//inhib

        3: { position: { x: 5448.357, y: 6169.100 }, info: { name: 'Turret_T1_C_05_A' }, character: 'OrderTurretNormal2' },//outer
        4: { position: { x: 4656.998, y: 4591.909 }, info: { name: 'Turret_T1_C_04_A' }, character: 'OrderTurretNormal' },//inner
        5: { position: { x: 3233.994, y: 3447.242 }, info: { name: 'Turret_T1_C_03_A' }, character: 'OrderTurretDragon' },//inhib
        6: { position: { x: 1341.633, y: 2029.984 }, info: { name: 'Turret_T1_C_01_A' }, character: 'OrderTurretAngel' },//nexus
        7: { position: { x: 1768.192, y: 1589.465 }, info: { name: 'Turret_T1_C_02_A' }, character: 'OrderTurretAngel' },//nexus

        8: { position: { x: -236.047, y: -53.322 }, info: { name: 'Turret_OrderTurretShrine_A' }, character: 'OrderTurretShrine' },

        9: { position: { x: 574.655, y: 10220.471 }, info: { name: 'Turret_T1_L_03_A' }, character: 'OrderTurretNormal2' },//outer
        10: { position: { x: 1106.263, y: 6465.252 }, info: { name: 'Turret_T1_L_02_A' }, character: 'OrderTurretNormal' },//inner
        11: { position: { x: 802.810, y: 4052.360 }, info: { name: 'Turret_T1_C_06_A' }, character: 'OrderTurretDragon' },//inhib
    },
    [TeamId.chaos]: {
        0: { position: { x: 13459.614, y: 4284.239 }, info: { name: 'Turret_T2_R_03_A' }, character: 'ChaosTurretWorm2' },//outer
        1: { position: { x: 12920.789, y: 8005.292 }, info: { name: 'Turret_T2_R_02_A' }, character: 'ChaosTurretWorm' },//inner
        2: { position: { x: 13205.825, y: 10474.619 }, info: { name: 'Turret_T2_R_01_A' }, character: 'ChaosTurretGiant' },//inhib

        3: { position: { x: 8548.805, y: 8289.496 }, info: { name: 'Turret_T2_C_05_A' }, character: 'ChaosTurretWorm2' },//outer
        4: { position: { x: 9361.072, y: 9892.624 }, info: { name: 'Turret_T2_C_04_A' }, character: 'ChaosTurretWorm' },//inner
        5: { position: { x: 10743.581, y: 11010.062 }, info: { name: 'Turret_T2_C_03_A' }, character: 'ChaosTurretGiant' },//inhib
        6: { position: { x: 12662.488, y: 12442.701 }, info: { name: 'Turret_T2_C_01_A' }, character: 'ChaosTurretNormal' },//nexus
        7: { position: { x: 12118.147, y: 12876.629 }, info: { name: 'Turret_T2_C_02_A' }, character: 'ChaosTurretNormal' },//nexus

        8: { position: { x: 14157.025, y: 14456.353 }, info: { name: 'Turret_ChaosTurretShrine_A' }, character: 'ChaosTurretShrine' },

        9: { position: { x: 3911.675, y: 13654.815 }, info: { name: 'Turret_T2_L_03_A' }, character: 'ChaosTurretWorm2' },//outer
        10: { position: { x: 7536.523, y: 13190.815 }, info: { name: 'Turret_T2_L_02_A' }, character: 'ChaosTurretWorm' },//inner
        11: { position: { x: 10261.900, y: 13465.911 }, info: { name: 'Turret_T2_L_01_A' }, character: 'ChaosTurretGiant' },//inhib
    }
};

export const players: { [team: number]: { [num: number]: { position: { x: number; y: number; }; rotation: number; }; }; } = {
    [TeamId.order]: {
        0: { position: { x: 25.9, y: 280 }, rotation: 0 },
        1: { position: { x: 25.9, y: 280 }, rotation: 0 },
        2: { position: { x: 25.9, y: 280 }, rotation: 0 },
        3: { position: { x: 25.9, y: 280 }, rotation: 0 },
        4: { position: { x: 25.9, y: 280 }, rotation: 0 },
        5: { position: { x: 25.9, y: 280 }, rotation: 0 },
    },
    [TeamId.chaos]: {
        0: { position: { x: 13948, y: 14202 }, rotation: 0 },
        1: { position: { x: 13948, y: 14202 }, rotation: 0 },
        2: { position: { x: 13948, y: 14202 }, rotation: 0 },
        3: { position: { x: 13948, y: 14202 }, rotation: 0 },
        4: { position: { x: 13948, y: 14202 }, rotation: 0 },
        5: { position: { x: 13948, y: 14202 }, rotation: 0 },
    },
};


export const barracks = {//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{x: 1533.0, y: 1321.0}
    [TeamId.order]: {
        0: { netId: 0xFFEB364C, position: { x: 917.7302, y: 1720.3623 }, info: { name: '__P_Order_Spawn_Barracks__L01' } },//0x42EB364C//,Z:140.0677
        1: { netId: 0xFFB77171, position: { x: 1418.3711, y: 1686.375 }, info: { name: '__P_Order_Spawn_Barracks__C01' } },//0x49B77171//,Z:134.7595
        2: { netId: 0xFF53B836, position: { x: 1487.0896, y: 1302.0958 }, info: { name: '__P_Order_Spawn_Barracks__R01' } },//0x5453B836//,Z:144.2386
    },
    [TeamId.chaos]: {
        0: { netId: 0xFFE647D5, position: { x: 12451.051, y: 13217.542 }, info: { name: '__P_Chaos_Spawn_Barracks__L01' } },//0x72E647D5//,Z:143.9473
        1: { netId: 0xFFBA00E8, position: { x: 12511.773, y: 12776.932 }, info: { name: '__P_Chaos_Spawn_Barracks__C01' } },//0x79BA00E8//,Z:126.2741
        2: { netId: 0xFF5EC9AF, position: { x: 13062.496, y: 12760.784 }, info: { name: '__P_Chaos_Spawn_Barracks__R01' } },//0x645EC9AF//,Z:134.706 
    },
};

// @todo correct positions, rotations
export const jungleCamps = {
    [TeamId.neutral]: {
        1: {
            type: 'Camp', name: 'blue_blue', monsters: [
                { position: { x: 3632.7002, y: 7600.373 }, info: { name: 'AncientGolem1.1.1' }, character: 'AncientGolem' },
                { position: { x: 3552.7002, y: 7799.373 }, info: { name: 'YoungLizard1.1.2' }, character: 'YoungLizard' },
                { position: { x: 3452.7002, y: 7590.373 }, info: { name: 'YoungLizard1.1.3' }, character: 'YoungLizard' },
            ]
        },
        2: {
            type: 'LesserCamp', name: 'blue_wolf', monsters: [
                { position: { x: 3373.6782, y: 6223.3457 }, info: { name: 'GiantWolf2.1.1' }, character: 'GiantWolf' },
                { position: { x: 3523.6782, y: 6223.3457 }, info: { name: 'Wolf2.1.2' }, character: 'Wolf' },
                { position: { x: 3323.6782, y: 6373.3457 }, info: { name: 'Wolf2.1.3' }, character: 'Wolf' },
            ]
        },
        3: {
            type: 'LesserCamp', name: 'blue_wraith', monsters: [
                { position: { x: 6423, y: 5278.29 }, info: { name: 'Wraith3.1.1' }, character: 'Wraith' },
                { position: { x: 6523, y: 5426.95 }, info: { name: 'LesserWraith3.1.2' }, character: 'LesserWraith' },
                { position: { x: 6653.83, y: 5278.29 }, info: { name: 'LesserWraith3.1.3' }, character: 'LesserWraith' },
                { position: { x: 6582.915, y: 5107.8857 }, info: { name: 'LesserWraith3.1.4' }, character: 'LesserWraith' },
            ]
        },
        4: {
            type: 'Camp', name: 'blue_red', monsters: [
                { position: { x: 7455.615, y: 3890.2026 }, info: { name: 'LizardElder4.1.1' }, character: 'LizardElder' },
                { position: { x: 7460.615, y: 3710.2026 }, info: { name: 'YoungLizard4.1.2' }, character: 'YoungLizard' },
                { position: { x: 7237.615, y: 3890.2026 }, info: { name: 'YoungLizard4.1.3' }, character: 'YoungLizard' },
            ]
        },
        5: {
            type: 'LesserCamp', name: 'blue_golem', monsters: [
                { position: { x: 7916.8423, y: 2533.9634 }, info: { name: 'SmallGolem5.1.1' }, character: 'SmallGolem' },
                { position: { x: 8216.842, y: 2533.9634 }, info: { name: 'Golem5.1.2' }, character: 'Golem' },
            ]
        },

        6: {
            type: 'Dragon', name: 'dragon', monsters: [
                { position: { x: 9459.52, y: 4193.03 }, info: { name: 'Dragon6.1.1' }, character: 'Dragon' },
            ]
        },

        7: {
            type: 'Camp', name: 'red_blue', monsters: [
                { position: { x: 10386.605, y: 6811.1123 }, info: { name: 'AncientGolem7.1.1' }, character: 'AncientGolem' },
                { position: { x: 10586.605, y: 6831.1123 }, info: { name: 'YoungLizard7.1.2' }, character: 'YoungLizard' },
                { position: { x: 10526.605, y: 6601.1123 }, info: { name: 'YoungLizard7.1.3' }, character: 'YoungLizard' },
            ]
        },
        8: {
            type: 'LesserCamp', name: 'red_wolf', monsters: [
                { position: { x: 10651.523, y: 8116.4243 }, info: { name: 'GiantWolf8.1.1' }, character: 'GiantWolf' },
                { position: { x: 10651.523, y: 7916.4243 }, info: { name: 'Wolf8.1.2' }, character: 'Wolf' },
                { position: { x: 10451.523, y: 8116.4243 }, info: { name: 'Wolf8.1.3' }, character: 'Wolf' },
            ]
        },
        9: {
            type: 'LesserCamp', name: 'red_wraith', monsters: [
                { position: { x: 7580.368, y: 9250.405 }, info: { name: 'Wraith9.1.1' }, character: 'Wraith' },
                { position: { x: 7480.368, y: 9091.405 }, info: { name: 'LesserWraith9.1.2' }, character: 'LesserWraith' },
                { position: { x: 7350.368, y: 9230.405 }, info: { name: 'LesserWraith9.1.3' }, character: 'LesserWraith' },
                { position: { x: 7450.368, y: 9350.405 }, info: { name: 'LesserWraith9.1.4' }, character: 'LesserWraith' },
            ]
        },
        10: {
            type: 'Camp', name: 'red_red', monsters: [
                { position: { x: 6504.2407, y: 10584.5625 }, info: { name: 'LizardElder10.1.1' }, character: 'LizardElder' },
                { position: { x: 6704.2407, y: 10584.5625 }, info: { name: 'YoungLizard10.1.2' }, character: 'YoungLizard' },
                { position: { x: 6504.2407, y: 10784.5625 }, info: { name: 'YoungLizard10.1.3' }, character: 'YoungLizard' },
            ]
        },
        11: {
            type: 'LesserCamp', name: 'red_golem', monsters: [
                { position: { x: 5810.464, y: 11925.474 }, info: { name: 'SmallGolem11.1.1' }, character: 'SmallGolem' },
                { position: { x: 6140.464, y: 11935.474 }, info: { name: 'Golem11.1.2' }, character: 'Golem' },
            ]
        },

        12: {
            type: 'Baron', name: 'baron', monsters: [
                { position: { x: 4600.495, y: 10250.462 }, info: { name: 'Worm12.1.1' }, character: 'Worm' },
            ]
        },

        13: {
            type: 'LesserCamp', name: 'blue_greatWraith', monsters: [
                { position: { x: 1684, y: 8207 }, info: { name: 'GreatWraith14.1.1' }, character: 'GreatWraith' },
            ]
        },
        14: {
            type: 'LesserCamp', name: 'red_greatWraith', monsters: [
                { position: { x: 12337, y: 6263 }, info: { name: 'GreatWraith14.1.1' }, character: 'GreatWraith' },
            ]
        },
    }
};

export const minionsLanePaths = {
    [TeamId.order]: [
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
        [
            new Vector2(1418, 1686),
            new Vector2(2997, 2781),
            new Vector2(4472, 4727),
            new Vector2(8375, 8366),
            new Vector2(10948, 10821),
            new Vector2(12511, 12776)
        ],
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
    ],
    [TeamId.chaos]: [
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
        [
            new Vector2(12511, 12776),
            new Vector2(10948, 10821),
            new Vector2(8375, 8366),
            new Vector2(4472, 4727),
            new Vector2(2997, 2781),
            new Vector2(1418, 1686)
        ],
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
    ],
};
