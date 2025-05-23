import { TeamId } from '../extensions/traits/team';
import { JungleCampOptions } from '../spawners/jungle-camp';

// @todo correct positions, rotations
export const jungleCamps: JungleCampOptions[] = [
    {
        //type: 'Camp',
        name: 'blue_blue',
        monsters: [
            {
                position: { x: 3632.7002, y: 7600.373 },
                facePosition: { x: 0, y: 0 },
                name: 'AncientGolem1.1.1',
                character: 'AncientGolem',
            },
            {
                position: { x: 3552.7002, y: 7799.373 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard1.1.2',
                character: 'YoungLizard',
            },
            {
                position: { x: 3452.7002, y: 7590.373 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard1.1.3',
                character: 'YoungLizard',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 1,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'blue_wolf',
        monsters: [
            {
                position: { x: 3373.6782, y: 6223.3457 },
                facePosition: { x: 0, y: 0 },
                name: 'GiantWolf2.1.1',
                character: 'GiantWolf',
            },
            {
                position: { x: 3523.6782, y: 6223.3457 },
                facePosition: { x: 0, y: 0 },
                name: 'Wolf2.1.2',
                character: 'Wolf',
            },
            {
                position: { x: 3323.6782, y: 6373.3457 },
                facePosition: { x: 0, y: 0 },
                name: 'Wolf2.1.3',
                character: 'Wolf',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 2,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'blue_wraith',
        monsters: [
            {
                position: { x: 6423, y: 5278.29 },
                facePosition: { x: 0, y: 0 },
                name: 'Wraith3.1.1',
                character: 'Wraith',
            },
            {
                position: { x: 6523, y: 5426.95 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith3.1.2',
                character: 'LesserWraith',
            },
            {
                position: { x: 6653.83, y: 5278.29 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith3.1.3',
                character: 'LesserWraith',
            },
            {
                position: { x: 6582.915, y: 5107.8857 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith3.1.4',
                character: 'LesserWraith',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 3,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'Camp',
        name: 'blue_red',
        monsters: [
            {
                position: { x: 7455.615, y: 3890.2026 },
                facePosition: { x: 0, y: 0 },
                name: 'LizardElder4.1.1',
                character: 'LizardElder',
            },
            {
                position: { x: 7460.615, y: 3710.2026 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard4.1.2',
                character: 'YoungLizard',
            },
            {
                position: { x: 7237.615, y: 3890.2026 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard4.1.3',
                character: 'YoungLizard',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 4,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'blue_golem',
        monsters: [
            {
                position: { x: 7916.8423, y: 2533.9634 },
                facePosition: { x: 0, y: 0 },
                name: 'SmallGolem5.1.1',
                character: 'SmallGolem',
            },
            {
                position: { x: 8216.842, y: 2533.9634 },
                facePosition: { x: 0, y: 0 },
                name: 'Golem5.1.2',
                character: 'Golem',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 5,
        respawnTime: 10,
        delaySpawnTime: 10,
    },

    {
        //type: 'Dragon',
        name: 'dragon',
        monsters: [
            {
                position: { x: 9459.52, y: 4193.03 },
                facePosition: { x: 0, y: 0 },
                name: 'Dragon6.1.1',
                character: 'Dragon',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 6,
        respawnTime: 10,
        delaySpawnTime: 10,
    },

    {
        //type: 'Camp',
        name: 'red_blue',
        monsters: [
            {
                position: { x: 10386.605, y: 6811.1123 },
                facePosition: { x: 0, y: 0 },
                name: 'AncientGolem7.1.1',
                character: 'AncientGolem',
            },
            {
                position: { x: 10586.605, y: 6831.1123 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard7.1.2',
                character: 'YoungLizard',
            },
            {
                position: { x: 10526.605, y: 6601.1123 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard7.1.3',
                character: 'YoungLizard',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 7,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'red_wolf',
        monsters: [
            {
                position: { x: 10651.523, y: 8116.4243 },
                facePosition: { x: 0, y: 0 },
                name: 'GiantWolf8.1.1',
                character: 'GiantWolf',
            },
            {
                position: { x: 10651.523, y: 7916.4243 },
                facePosition: { x: 0, y: 0 },
                name: 'Wolf8.1.2',
                character: 'Wolf',
            },
            {
                position: { x: 10451.523, y: 8116.4243 },
                facePosition: { x: 0, y: 0 },
                name: 'Wolf8.1.3',
                character: 'Wolf',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 8,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'red_wraith',
        monsters: [
            {
                position: { x: 7580.368, y: 9250.405 },
                facePosition: { x: 0, y: 0 },
                name: 'Wraith9.1.1',
                character: 'Wraith',
            },
            {
                position: { x: 7480.368, y: 9091.405 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith9.1.2',
                character: 'LesserWraith',
            },
            {
                position: { x: 7350.368, y: 9230.405 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith9.1.3',
                character: 'LesserWraith',
            },
            {
                position: { x: 7450.368, y: 9350.405 },
                facePosition: { x: 0, y: 0 },
                name: 'LesserWraith9.1.4',
                character: 'LesserWraith',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 9,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'Camp',
        name: 'red_red',
        monsters: [
            {
                position: { x: 6504.2407, y: 10584.5625 },
                facePosition: { x: 0, y: 0 },
                name: 'LizardElder10.1.1',
                character: 'LizardElder',
            },
            {
                position: { x: 6704.2407, y: 10584.5625 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard10.1.2',
                character: 'YoungLizard',
            },
            {
                position: { x: 6504.2407, y: 10784.5625 },
                facePosition: { x: 0, y: 0 },
                name: 'YoungLizard10.1.3',
                character: 'YoungLizard',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 10,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'red_golem',
        monsters: [
            {
                position: { x: 5810.464, y: 11925.474 },
                facePosition: { x: 0, y: 0 },
                name: 'SmallGolem11.1.1',
                character: 'SmallGolem',
            },
            {
                position: { x: 6140.464, y: 11935.474 },
                facePosition: { x: 0, y: 0 },
                name: 'Golem11.1.2',
                character: 'Golem',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 11,
        respawnTime: 10,
        delaySpawnTime: 10,
    },

    {
        //type: 'Baron',
        name: 'baron',
        monsters: [
            {
                position: { x: 4600.495, y: 10250.462 },
                facePosition: { x: 0, y: 0 },
                name: 'Worm12.1.1',
                character: 'Worm',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 12,
        respawnTime: 10,
        delaySpawnTime: 10,
    },

    {
        //type: 'LesserCamp',
        name: 'blue_greatWraith',
        monsters: [
            {
                position: { x: 1684, y: 8207 },
                facePosition: { x: 0, y: 0 },
                name: 'GreatWraith14.1.1',
                character: 'GreatWraith',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 13,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
    {
        //type: 'LesserCamp',
        name: 'red_greatWraith',
        monsters: [
            {
                position: { x: 12337, y: 6263 },
                facePosition: { x: 0, y: 0 },
                name: 'GreatWraith14.1.1',
                character: 'GreatWraith',
            },
        ],
        team: TeamId.neutral,
        side: TeamId.neutral,
        num: 14,
        respawnTime: 10,
        delaySpawnTime: 10,
    },
];
