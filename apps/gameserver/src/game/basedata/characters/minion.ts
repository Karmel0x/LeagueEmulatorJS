import _Character from './character';

export enum MinionType {
    melee = 0,
    caster = 3,
    cannon = 2,
    super = 1,
}

export default class _Minion extends _Character {
    id = 0;

    static reward = {
        gold: 0,
        exp: 0,
    };

    static rewardPerLevel = {
        gold: 0,
        exp: 0,
    };

}
