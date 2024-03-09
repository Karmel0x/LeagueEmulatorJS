import { Vector2 } from 'three';
import { TeamId } from '../extensions/traits/team';
import type { NexusOptions } from '../units/structures/nexus';
import type { InhibitorOptions } from '../units/structures/inhibitor';
import type { TurretOptions } from '../units/structures/turret';
import type { SpawnConfig } from '.';

export const nexuses: SpawnConfig<NexusOptions> = {
    [TeamId.order]: {
        0: {
            netId: 0xFFF97DB5,//4294540725
            position: { x: 1131.728, y: 1426.288 },
            info: { name: 'HQ_T1' },
            character: 'OrderNexus'
        }
    },
    [TeamId.chaos]: {
        0: {
            netId: 0xFFF02C0F,//4293929999
            position: { x: 12760.906, y: 13026.066 },
            info: { name: 'HQ_T2' },
            character: 'ChaosNexus'
        },
    },
};

export const inhibitors: SpawnConfig<InhibitorOptions> = {
    [TeamId.order]: {
        0: {
            netId: 0xFFD23C3E,//4291968062
            position: { x: 823.7, y: 3361.6 },
            info: { name: 'Barracks_T1_R1' },
            character: 'OrderInhibitor'
        },
        1: {
            netId: 0xFF4A20F1,//4283048177
            position: { x: 2785.5, y: 2958.2 },
            info: { name: 'Barracks_T1_C1' },
            character: 'OrderInhibitor'
        },
        2: {
            netId: 0xFF9303E1,//4287824865
            position: { x: 3036.3, y: 1017.6 },
            info: { name: 'Barracks_T1_L1' },
            character: 'OrderInhibitor'
        },
    },
    [TeamId.chaos]: {
        0: {
            netId: 0xFF6793D0,//4284978128
            position: { x: 10958.791, y: 13434.588 },
            info: { name: 'Barracks_T2_R1' },
            character: 'ChaosInhibitor'
        },
        1: {
            netId: 0xFFFF8F1F,//4294938399
            position: { x: 11238.580, y: 11470.119 },
            info: { name: 'Barracks_T2_C1' },
            character: 'ChaosInhibitor'
        },
        2: {
            netId: 0xFF26AC0F,//4280724495
            position: { x: 13208.756, y: 11174.174 },
            info: { name: 'Barracks_T2_L1' },
            character: 'ChaosInhibitor'
        },
    },
};

export const turrets: SpawnConfig<TurretOptions> = {
    [TeamId.order]: {
        0: {
            //type: 'outer',
            position: { x: 10097.618, y: 808.733 },
            info: { name: 'Turret_T1_R_03_A' },
            character: 'OrderTurretNormal2'
        },
        1: {
            //type: 'inner',
            position: { x: 6512.527, y: 1262.615 },
            info: { name: 'Turret_T1_R_02_A' },
            character: 'OrderTurretNormal'
        },
        2: {
            //type: 'inhib',
            position: { x: 3747.255, y: 1041.044 },
            info: { name: 'Turret_T1_C_07_A' },
            character: 'OrderTurretDragon'
        },

        3: {
            //type: 'outer',
            position: { x: 5448.357, y: 6169.100 },
            info: { name: 'Turret_T1_C_05_A' },
            character: 'OrderTurretNormal2'
        },
        4: {
            //type: 'inner',
            position: { x: 4656.998, y: 4591.909 },
            info: { name: 'Turret_T1_C_04_A' },
            character: 'OrderTurretNormal'
        },
        5: {
            //type: 'inhib',
            position: { x: 3233.994, y: 3447.242 },
            info: { name: 'Turret_T1_C_03_A' },
            character: 'OrderTurretDragon'
        },
        6: {
            //type: 'nexus',
            position: { x: 1341.633, y: 2029.984 },
            info: { name: 'Turret_T1_C_01_A' },
            character: 'OrderTurretAngel'
        },
        7: {
            //type: 'nexus',
            position: { x: 1768.192, y: 1589.465 },
            info: { name: 'Turret_T1_C_02_A' },
            character: 'OrderTurretAngel'
        },

        8: {
            //type: 'fountain',
            position: { x: -236.047, y: -53.322 },
            info: { name: 'Turret_OrderTurretShrine_A' },
            character: 'OrderTurretShrine'
        },

        9: {
            //type: 'outer',
            position: { x: 574.655, y: 10220.471 },
            info: { name: 'Turret_T1_L_03_A' },
            character: 'OrderTurretNormal2'
        },
        10: {
            //type: 'inner',
            position: { x: 1106.263, y: 6465.252 },
            info: { name: 'Turret_T1_L_02_A' },
            character: 'OrderTurretNormal'
        },
        11: {
            //type: 'inhib',
            position: { x: 802.810, y: 4052.360 },
            info: { name: 'Turret_T1_C_06_A' },
            character: 'OrderTurretDragon'
        },
    },
    [TeamId.chaos]: {
        0: {
            //type: 'outer',
            position: { x: 13459.614, y: 4284.239 },
            info: { name: 'Turret_T2_R_03_A' },
            character: 'ChaosTurretWorm2'
        },
        1: {
            //type: 'inner',
            position: { x: 12920.789, y: 8005.292 },
            info: { name: 'Turret_T2_R_02_A' },
            character: 'ChaosTurretWorm'
        },
        2: {
            //type: 'inhib',
            position: { x: 13205.825, y: 10474.619 },
            info: { name: 'Turret_T2_R_01_A' },
            character: 'ChaosTurretGiant'
        },

        3: {
            //type: 'outer',
            position: { x: 8548.805, y: 8289.496 },
            info: { name: 'Turret_T2_C_05_A' },
            character: 'ChaosTurretWorm2'
        },
        4: {
            //type: 'inner',
            position: { x: 9361.072, y: 9892.624 },
            info: { name: 'Turret_T2_C_04_A' },
            character: 'ChaosTurretWorm'
        },
        5: {
            //type: 'inhib',
            position: { x: 10743.581, y: 11010.062 },
            info: { name: 'Turret_T2_C_03_A' },
            character: 'ChaosTurretGiant'
        },
        6: {
            //type: 'nexus',
            position: { x: 12662.488, y: 12442.701 },
            info: { name: 'Turret_T2_C_01_A' },
            character: 'ChaosTurretNormal'
        },
        7: {
            //type: 'nexus',
            position: { x: 12118.147, y: 12876.629 },
            info: { name: 'Turret_T2_C_02_A' },
            character: 'ChaosTurretNormal'
        },

        8: {
            //type: 'fountain',
            position: { x: 14157.025, y: 14456.353 },
            info: { name: 'Turret_ChaosTurretShrine_A' },
            character: 'ChaosTurretShrine'
        },

        9: {
            //type: 'outer',
            position: { x: 3911.675, y: 13654.815 },
            info: { name: 'Turret_T2_L_03_A' },
            character: 'ChaosTurretWorm2'
        },
        10: {
            //type: 'inner',
            position: { x: 7536.523, y: 13190.815 },
            info: { name: 'Turret_T2_L_02_A' },
            character: 'ChaosTurretWorm'
        },
        11: {
            //type: 'inhib',
            position: { x: 10261.900, y: 13465.911 },
            info: { name: 'Turret_T2_L_01_A' },
            character: 'ChaosTurretGiant'
        },
    }
};
