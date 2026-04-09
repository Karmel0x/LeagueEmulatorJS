import SummonersRift from '@repo/gamedata/maps/map1/general';
import TwistedTreeline from '@repo/gamedata/maps/map10/general';
import type Level from '../base/level';

export function loadLevel(mapName: string) {

    let level: Level;

    if (mapName === '1')
        level = new SummonersRift();
    else if (mapName === '10')
        level = new TwistedTreeline();
    else
        throw new Error("map not implemented");

    return level;
}
