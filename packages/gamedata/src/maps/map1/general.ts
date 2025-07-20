import Level from '@repo/scripting/base/level';
import constants from './constants';
import * as positions from "./positions";

export default class SummonersRift extends Level {

    static id = 1;
    static diagonal = 25000;
    static positions = positions;
    static constants = constants;

    // TODO: need to verify
    static middleOfMap = {
        x: 6991.434,
        y: 7223.3438
    };

    static deathTimes = [
        7.5,
        10,
        12.5,
        15,
        17.5,
        20,
        22.5,
        25,
        27.5,
        30,
        32.5,
        35,
        37.5,
        40,
        42.5,
        45,
        47.5,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
    ];

}
