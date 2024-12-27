import type { SpawnConfig } from '.';
import { LaneId, TeamId } from '../extensions/traits/team';
import type { InhibitorOptions } from '../unit-ai/structures/inhibitor';
import type { NexusOptions } from '../unit-ai/structures/nexus';
import type { TurretOptions } from '../unit-ai/structures/turret';

export const nexuses: SpawnConfig<NexusOptions>[] = [
    {
        netId: 0xFFF97DB5,//4294540725
        position: { x: 1131.728, y: 1426.288 },
        name: 'HQ_T1',
        character: 'OrderNexus',
        team: TeamId.order,
    }, {
        netId: 0xFFF02C0F,//4293929999
        position: { x: 12760.906, y: 13026.066 },
        name: 'HQ_T2',
        character: 'ChaosNexus',
        team: TeamId.chaos,
    },
];

export const inhibitors: SpawnConfig<InhibitorOptions>[] = [
    {
        netId: 0xFFD23C3E,//4291968062
        position: { x: 823.7, y: 3361.6 },
        name: 'Barracks_T1_R1',
        character: 'OrderInhibitor',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
        },
    },
    {
        netId: 0xFF4A20F1,//4283048177
        position: { x: 2785.5, y: 2958.2 },
        name: 'Barracks_T1_C1',
        character: 'OrderInhibitor',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.mid,
        },
    },
    {
        netId: 0xFF9303E1,//4287824865
        position: { x: 3036.3, y: 1017.6 },
        name: 'Barracks_T1_L1',
        character: 'OrderInhibitor',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.bot,
        },
    },
    {
        netId: 0xFF6793D0,//4284978128
        position: { x: 10958.791, y: 13434.588 },
        name: 'Barracks_T2_R1',
        character: 'ChaosInhibitor',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
        },
    },
    {
        netId: 0xFFFF8F1F,//4294938399
        position: { x: 11238.580, y: 11470.119 },
        name: 'Barracks_T2_C1',
        character: 'ChaosInhibitor',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.mid,
        },
    },
    {
        netId: 0xFF26AC0F,//4280724495
        position: { x: 13208.756, y: 11174.174 },
        name: 'Barracks_T2_L1',
        character: 'ChaosInhibitor',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.bot,
        },
    },
];

export const turrets: SpawnConfig<TurretOptions>[] = [
    {
        //type: 'outer',
        position: { x: 10097.618, y: 808.733 },
        name: 'Turret_T1_R_03_A',
        character: 'OrderTurretNormal2',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 6512.527, y: 1262.615 },
        name: 'Turret_T1_R_02_A',
        character: 'OrderTurretNormal',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 3747.255, y: 1041.044 },
        name: 'Turret_T1_C_07_A',
        character: 'OrderTurretDragon',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },

    {
        //type: 'outer',
        position: { x: 5448.357, y: 6169.100 },
        name: 'Turret_T1_C_05_A',
        character: 'OrderTurretNormal2',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 4656.998, y: 4591.909 },
        name: 'Turret_T1_C_04_A',
        character: 'OrderTurretNormal',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 3233.994, y: 3447.242 },
        name: 'Turret_T1_C_03_A',
        character: 'OrderTurretDragon',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },
    {
        //type: 'nexus',
        position: { x: 1341.633, y: 2029.984 },
        name: 'Turret_T1_C_01_A',
        character: 'OrderTurretAngel',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 5,
        },
    },
    {
        //type: 'nexus',
        position: { x: 1768.192, y: 1589.465 },
        name: 'Turret_T1_C_02_A',
        character: 'OrderTurretAngel',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 4,
        },
    },

    {
        //type: 'fountain',
        position: { x: -236.047, y: -53.322 },
        name: 'Turret_OrderTurretShrine_A',
        character: 'OrderTurretShrine',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 0,
        },
    },

    {
        //type: 'outer',
        position: { x: 574.655, y: 10220.471 },
        name: 'Turret_T1_L_03_A',
        character: 'OrderTurretNormal2',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 1106.263, y: 6465.252 },
        name: 'Turret_T1_L_02_A',
        character: 'OrderTurretNormal',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 802.810, y: 4052.360 },
        name: 'Turret_T1_C_06_A',
        character: 'OrderTurretDragon',
        team: TeamId.order,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },

    {
        //type: 'outer',
        position: { x: 13459.614, y: 4284.239 },
        name: 'Turret_T2_R_03_A',
        character: 'ChaosTurretWorm2',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 12920.789, y: 8005.292 },
        name: 'Turret_T2_R_02_A',
        character: 'ChaosTurretWorm',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 13205.825, y: 10474.619 },
        name: 'Turret_T2_R_01_A',
        character: 'ChaosTurretGiant',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },

    {
        //type: 'outer',
        position: { x: 8548.805, y: 8289.496 },
        name: 'Turret_T2_C_05_A',
        character: 'ChaosTurretWorm2',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 9361.072, y: 9892.624 },
        name: 'Turret_T2_C_04_A',
        character: 'ChaosTurretWorm',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 10743.581, y: 11010.062 },
        name: 'Turret_T2_C_03_A',
        character: 'ChaosTurretGiant',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },
    {
        //type: 'nexus',
        position: { x: 12662.488, y: 12442.701 },
        name: 'Turret_T2_C_01_A',
        character: 'ChaosTurretNormal',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 5,
        },
    },
    {
        //type: 'nexus',
        position: { x: 12118.147, y: 12876.629 },
        name: 'Turret_T2_C_02_A',
        character: 'ChaosTurretNormal',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 4,
        },
    },

    {
        //type: 'fountain',
        position: { x: 14157.025, y: 14456.353 },
        name: 'Turret_ChaosTurretShrine_A',
        character: 'ChaosTurretShrine',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 0,
        },
    },

    {
        //type: 'outer',
        position: { x: 3911.675, y: 13654.815 },
        name: 'Turret_T2_L_03_A',
        character: 'ChaosTurretWorm2',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 3,
        },
    },
    {
        //type: 'inner',
        position: { x: 7536.523, y: 13190.815 },
        name: 'Turret_T2_L_02_A',
        character: 'ChaosTurretWorm',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 2,
        },
    },
    {
        //type: 'inhib',
        position: { x: 10261.900, y: 13465.911 },
        name: 'Turret_T2_L_01_A',
        character: 'ChaosTurretGiant',
        team: TeamId.chaos,
        aiOptions: {
            lane: LaneId.top,
            num: 1,
        },
    },

];
